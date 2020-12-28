import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, concatMap, mergeMap, debounceTime, filter, exhaustMap } from 'rxjs/operators';

import { PhotoRotation } from 'src/app/models/photo-rotation.model';
import { ExifFormatterService } from 'src/app/photos/services/exif-formatter.service';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';
import * as PhotoActions from './actions';
import * as PhotoStoreSelectors from './selectors';
import { LayoutStoreActions, PhotoCategoryStoreActions } from 'src/app/core/root-store';
import { DEFAULT_PHOTO_EFFECTS } from 'src/app/models/photo-effects.model';

@Injectable()
export class PhotoStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadRequest),
            switchMap(action =>
                this.api.getPhotosByCategory(action.categoryId)
                    .pipe(
                        map(photos => PhotoActions.loadSuccess({ photos: photos.items })),
                        catchError(error => of(PhotoActions.loadFailure({ error })))
                    )
            )
        );
    });

    loadRandomRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadRandomRequest),
            exhaustMap(action =>
                this.api.getRandomPhoto()
                    .pipe(
                        map(photo => PhotoActions.loadRandomSuccess({ photo })),
                        catchError(error => of(PhotoActions.loadRandomFailure({ error })))
                    )
            )
        );
    });

    loadMultipleRandomRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadMultipleRandomRequest),
            switchMap(action =>
                this.api.getRandomPhotos(action.count)
                    .pipe(
                        map(photos => PhotoActions.loadMultipleRandomSuccess({ photos: photos.items })),
                        catchError(error => of(PhotoActions.loadMultipleRandomFailure({ error })))
                    )
            )
        );
    });

    loadRatingRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadRatingRequest),
            switchMap(action =>
                this.api.getRating(action.photoId)
                    .pipe(
                        map(rating => PhotoActions.loadRatingSuccess({ rating })),
                        catchError(error => of(PhotoActions.loadRatingFailure({ error })))
                    )
            )
        );
    });

    ratePhotoRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.ratePhotoRequest),
            concatMap(action =>
                this.api.ratePhoto(action.photoId, action.userRating)
                    .pipe(
                        map(rating => PhotoActions.ratePhotoSuccess({ rating })),
                        catchError(error => of(PhotoActions.ratePhotoFailure({ error })))
                    )
            )
        );
    });

    loadCommentsRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadCommentsRequest),
            switchMap(action =>
                this.api.getComments(action.photoId)
                    .pipe(
                        map(comments => PhotoActions.loadCommentsSuccess({ comments: comments.items })),
                        catchError(error => of(PhotoActions.ratePhotoFailure({ error })))
                    )
            )
        );
    });

    addCommentRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.addCommentRequest),
            concatMap(action =>
                this.api.addComment(action.photoId, action.comment)
                    .pipe(
                        map(result => PhotoActions.addCommentSuccess({ photoId: action.photoId })),
                        catchError(error => of(PhotoActions.addCommentFailure({ error })))
                    )
            )
        );
    });

    addCommentSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.addCommentSuccess),
            concatMap(action => of(PhotoActions.loadCommentsRequest({ photoId: action.photoId })))
        );
    });

    loadExifRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadExifRequest),
            switchMap(action =>
                this.api.getExifData(action.photoId)
                    .pipe(
                        map(detail => this.exifFormatterService.format(detail)),
                        map(data => PhotoActions.loadExifSuccess({ exif: data })),
                        catchError(error => of(PhotoActions.loadExifFailure({ error })))
                    )
            )
        );
    });

    loadGpsDetailRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadGpsDetailRequest),
            switchMap(action =>
                this.api.getGpsDetail(action.photoId)
                    .pipe(
                        map(gpsDetail => PhotoActions.loadGpsDetailSuccess({ gpsDetail })),
                        catchError(error => of(PhotoActions.loadGpsDetailFailure({ error })))
                    )
            )
        );
    });

    setGpsOverrideRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideRequest),
            mergeMap(action =>
                this.api.setGpsCoordinateOverride(action.photoId, action.latLng)
                    .pipe(
                        map(gpsDetail => PhotoActions.setGpsCoordinateOverrideSuccess({ photoId: action.photoId, gpsDetail })),
                        catchError(error => of(PhotoActions.setGpsCoordinateOverrideFailure({ error })))
                    ),
                    24
            )
        );
    });

    setGpsOverrideAndMoveNextRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideAndMoveNextRequest),
            concatMap(action =>
                this.api.setGpsCoordinateOverride(action.photoId, action.latLng)
                    .pipe(
                        // eslint-disable-next-line
                        switchMap(gpsDetail => [
                            PhotoActions.setGpsCoordinateOverrideSuccess({ photoId: action.photoId, gpsDetail }),
                            PhotoActions.moveNextRequest()
                        ]),
                        catchError(error => of(PhotoActions.setGpsCoordinateOverrideFailure({ error })))
                    )
            )
        );
    });

    updateCategoryAfterGpsCoordinateOverideSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideSuccess),
            debounceTime(200),
            concatMap(action =>
                this.store
                    .select(PhotoStoreSelectors.allPhotos)
                    .pipe(
                        filter(photos => !!photos && !!photos[0]),  // sometimes will get an undefined photos[0] but not sure why
                        map(photos => {
                            const catId = photos[0].categoryId;
                            let isMissingGpsData = false;

                            for (const photo of photos) {
                                if (photo.latitude === null || photo.longitude === null) {
                                    isMissingGpsData = true;
                                    break;
                                }
                            }

                            return PhotoCategoryStoreActions.setIsMissingGpsData({ categoryId: catId, isMissingGpsData});
                        })
                    )
            )
        );
    });

    rotateClockwiseEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.rotateClockwiseRequest),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(PhotoStoreSelectors.activePhotoEffects))
            )),
            map(([action, photoEffects]) => {
                const rotation = !!photoEffects?.rotation ? new PhotoRotation(photoEffects.rotation.klass) : new PhotoRotation();

                rotation.rotateClockwise();

                return PhotoActions.rotateSuccess({ newRotation: rotation });
            })
        );
    });

    rotateCounterClockwiseEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.rotateCounterClockwiseRequest),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.select(PhotoStoreSelectors.activePhotoEffects))
            )),
            map(([action, photoEffects]) => {
                const rotation = !!photoEffects?.rotation ? new PhotoRotation(photoEffects.rotation.klass) : new PhotoRotation();

                rotation.rotateCounterClockwise();

                return PhotoActions.rotateSuccess({ newRotation: rotation });
            })
        );
    });

    unsetActivePhotoIdEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.unsetActivePhotoId),
            map(action => {
                return PhotoActions.setActivePhotoId({ id: null });
            })
        );
    });

    moveNextEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.moveNextRequest),
            withLatestFrom(this.store.select(PhotoStoreSelectors.nextPhoto)),
            filter(([action, photo]) => !!photo),
            map(([action, photo]) => PhotoActions.navigateToPhoto({
                categoryId: photo?.categoryId as number,
                photoId: photo?.id as number
            }))
        );
    });

    movePreviousEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.movePreviousRequest),
            withLatestFrom(this.store.select(PhotoStoreSelectors.previousPhoto)),
            filter(([action, photo]) => !!photo),
            map(([action, photo]) => PhotoActions.navigateToPhoto({
                categoryId: photo?.categoryId as number,
                photoId: photo?.id as number
            }))
        );
    });

    resetPhotoEffectsForNewPhotoEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setActivePhotoId),
            concatMap(action => {
                return of(PhotoActions.resetEffectsRequest());
            })
        );
    });

    resetPhotoEffectsEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.resetEffectsRequest),
            concatMap(action => {
                return of(PhotoActions.updateEffectsRequest({ effects: DEFAULT_PHOTO_EFFECTS }));
            })
        );
    });

    enterFullScreenEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.enterFullscreenRequest),
            concatMap(action => {
                return of(LayoutStoreActions.enterFullscreenRequest());
            })
        );
    });

    exitFullScreenEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.exitFullscreenRequest),
            concatMap(action => {
                return of(LayoutStoreActions.exitFullscreenRequest());
            })
        );
    });

    enterRandomViewClearsPhotosEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.enterRandomView),
            concatMap(action => {
                return of(PhotoActions.clearRequest());
            })
        );
    });

    enterRandomViewLoadsRandomPhotosEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.enterRandomView),
            concatMap(action => {
                return of(PhotoActions.loadMultipleRandomRequest({ count: action.count }));
            })
        );
    });

    constructor(
        private actions$: Actions,
        private exifFormatterService: ExifFormatterService,
        private store: Store,
        @Inject(photoApiServiceToken) private api: PhotoApiService,
    ) {

    }
}
