import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of, timer } from 'rxjs';
import {
    switchMap,
    catchError,
    map,
    concatMap,
    mergeMap,
    debounceTime,
    filter,
    exhaustMap,
    takeUntil,
} from 'rxjs/operators';

import {
    CategoryGpsStatus,
    DEFAULT_PHOTO_EFFECTS,
    PhotoRotation,
    formatExif,
    httpErrorHandler,
} from '@models';
import {
    photoApiServiceToken,
    PhotoApiService,
} from '@core/services/photo-api.service';
import * as PhotoActions from './actions';
import * as PhotoStoreSelectors from './selectors';
import * as PhotoCategoryStoreActions from '@core/root-store/photo-category-store/actions';
import { RouterStoreSelectors } from '../router-store';
import { PhotoPageSettingsFacade } from '@core/facades/settings/photo-page-settings-facade';
import { RandomPageSettingsFacade } from '@core/facades/settings/random-page-settings-facade';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PhotoStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadRequest),
            switchMap((action) =>
                this.api.getPhotosByCategory(action.categoryId).pipe(
                    map((photos) =>
                        PhotoActions.loadSuccess({ photos: photos.items })
                    ),
                    catchError((error) =>
                        of(
                            PhotoActions.loadFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadRandomRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadRandomRequest),
            exhaustMap(() =>
                this.api.getRandomPhoto().pipe(
                    map((photo) => PhotoActions.loadRandomSuccess({ photo })),
                    catchError((error) =>
                        of(
                            PhotoActions.loadRandomFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadMultipleRandomRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadMultipleRandomRequest),
            switchMap((action) =>
                this.api.getRandomPhotos(action.count).pipe(
                    map((photos) =>
                        PhotoActions.loadMultipleRandomSuccess({
                            photos: photos.items,
                        })
                    ),
                    catchError((error) =>
                        of(
                            PhotoActions.loadMultipleRandomFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadRatingsForPhotoWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.store.select(PhotoStoreSelectors.selectActivePhotoId),
            this.store.select(PhotoStoreSelectors.selectIsRatingCardVisible),
        ]).pipe(
            filter(([photoId, isVisible]) => !!photoId && isVisible),
            map(([photoId]) =>
                PhotoActions.loadRatingRequest({ photoId: photoId as number })
            )
        );
    });

    loadRatingRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadRatingRequest),
            switchMap((action) =>
                this.api.getRating(action.photoId).pipe(
                    map((rating) => PhotoActions.loadRatingSuccess({ rating })),
                    catchError((error) =>
                        of(
                            PhotoActions.loadRatingFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    ratePhotoRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.ratePhotoRequest),
            concatMap((action) =>
                this.api.ratePhoto(action.photoId, action.userRating).pipe(
                    map((rating) => PhotoActions.ratePhotoSuccess({ rating })),
                    catchError((error) =>
                        of(
                            PhotoActions.ratePhotoFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadCommentsForPhotoWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.store.select(PhotoStoreSelectors.selectActivePhotoId),
            this.store.select(PhotoStoreSelectors.selectIsCommentCardVisible),
        ]).pipe(
            filter(([photoId, isVisible]) => !!photoId && isVisible),
            map(([photoId]) =>
                PhotoActions.loadCommentsRequest({ photoId: photoId as number })
            )
        );
    });

    loadCommentsRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadCommentsRequest),
            switchMap((action) =>
                this.api.getComments(action.photoId).pipe(
                    map((comments) =>
                        PhotoActions.loadCommentsSuccess({
                            comments: comments.items,
                        })
                    ),
                    catchError((error) =>
                        of(
                            PhotoActions.ratePhotoFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    addCommentRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.addCommentRequest),
            concatMap((action) =>
                this.api.addComment(action.photoId, action.comment).pipe(
                    map(() =>
                        PhotoActions.addCommentSuccess({
                            photoId: action.photoId,
                        })
                    ),
                    catchError((error) =>
                        of(
                            PhotoActions.addCommentFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    addCommentSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.addCommentSuccess),
            concatMap((action) =>
                of(
                    PhotoActions.loadCommentsRequest({
                        photoId: action.photoId,
                    })
                )
            )
        );
    });

    loadExifDataForPhotoWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.store.select(PhotoStoreSelectors.selectActivePhotoId),
            this.store.select(PhotoStoreSelectors.selectIsExifCardVisible),
        ]).pipe(
            filter(([photoId, isVisible]) => !!photoId && isVisible),
            map(([photoId]) =>
                PhotoActions.loadExifRequest({ photoId: photoId as number })
            )
        );
    });

    loadExifRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadExifRequest),
            switchMap((action) =>
                this.api.getExifData(action.photoId).pipe(
                    map((detail) => formatExif(detail)),
                    map((data) => PhotoActions.loadExifSuccess({ exif: data })),
                    catchError((error) =>
                        of(
                            PhotoActions.loadExifFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadGpsDetailForPhotoWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.store.select(PhotoStoreSelectors.selectActivePhotoId),
            this.store.select(PhotoStoreSelectors.selectIsMetadataEditorCardVisible),
        ]).pipe(
            filter(([photoId, isVisible]) => !!photoId && isVisible),
            map(([photoId]) =>
                PhotoActions.loadGpsDetailRequest({
                    photoId: photoId as number,
                })
            )
        );
    });

    loadGpsDetailRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.loadGpsDetailRequest),
            switchMap((action) =>
                this.api.getGpsDetail(action.photoId).pipe(
                    map((gpsDetail) =>
                        PhotoActions.loadGpsDetailSuccess({ gpsDetail })
                    ),
                    catchError((error) =>
                        of(
                            PhotoActions.loadGpsDetailFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    setGpsOverrideRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideRequest),
            mergeMap(
                (action) =>
                    this.api
                        .setGpsCoordinateOverride(action.photoId, action.latLng)
                        .pipe(
                            map((gpsDetail) =>
                                PhotoActions.setGpsCoordinateOverrideSuccess({
                                    photoId: action.photoId,
                                    gpsDetail,
                                })
                            ),
                            catchError((error) =>
                                of(
                                    PhotoActions.setGpsCoordinateOverrideFailure(
                                        { error: httpErrorHandler(error as HttpErrorResponse) }
                                    )
                                )
                            )
                        ),
                24
            )
        );
    });

    setGpsOverrideAndMoveNextRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideAndMoveNextRequest),
            concatMap((action) =>
                this.api
                    .setGpsCoordinateOverride(action.photoId, action.latLng)
                    .pipe(
                        // eslint-disable-next-line
                        switchMap(gpsDetail => [
                            PhotoActions.setGpsCoordinateOverrideSuccess({
                                photoId: action.photoId,
                                gpsDetail,
                            }),
                            PhotoActions.moveNextRequest(),
                        ]),
                        catchError((error) =>
                            of(
                                PhotoActions.setGpsCoordinateOverrideFailure({
                                    error: httpErrorHandler(error as HttpErrorResponse),
                                })
                            )
                        )
                    )
            )
        );
    });

    updateCategoryAfterGpsCoordinateOverideSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideSuccess),
            debounceTime(200),
            concatMap(() =>
                this.store.select(PhotoStoreSelectors.selectCategoryGpsStatus).pipe(
                    filter((missingDetails) => !!missingDetails),
                    // eslint-disable-next-line ngrx/avoid-mapping-selectors
                    map((missingDetails) => {
                        return PhotoCategoryStoreActions.setIsMissingGpsData(
                            missingDetails as CategoryGpsStatus
                        );
                    })
                )
            )
        );
    });

    rotateClockwiseEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.rotateClockwiseRequest),
            concatMap((action) =>
                of(action).pipe(
                    concatLatestFrom(() =>
                        this.store.select(PhotoStoreSelectors.selectActivePhotoEffects)
                    )
                )
            ),
            map(([, photoEffects]) => {
                const rotation = photoEffects?.rotation
                    ? new PhotoRotation(photoEffects.rotation.klass)
                    : new PhotoRotation();

                rotation.rotateClockwise();

                return PhotoActions.rotateSuccess({ newRotation: rotation });
            })
        );
    });

    rotateCounterClockwiseEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.rotateCounterClockwiseRequest),
            concatMap((action) =>
                of(action).pipe(
                    concatLatestFrom(() =>
                        this.store.select(PhotoStoreSelectors.selectActivePhotoEffects)
                    )
                )
            ),
            map(([, photoEffects]) => {
                const rotation = photoEffects?.rotation
                    ? new PhotoRotation(photoEffects.rotation.klass)
                    : new PhotoRotation();

                rotation.rotateCounterClockwise();

                return PhotoActions.rotateSuccess({ newRotation: rotation });
            })
        );
    });

    moveNextEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.moveNextRequest),
            concatLatestFrom(() => [
                this.store.select(PhotoStoreSelectors.selectNextPhoto),
                this.store.select(RouterStoreSelectors.selectCurrentViewMode)
            ]),
            filter(([, photo]) => !!photo),
            map(([, photo, view]) =>
                PhotoActions.navigateToPhoto({
                    view,
                    categoryId: photo?.categoryId as number,
                    photoId: photo?.id as number,
                })
            )
        );
    });

    movePreviousEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.movePreviousRequest),
            concatLatestFrom(() => [
                this.store.select(PhotoStoreSelectors.selectPreviousPhoto),
                this.store.select(RouterStoreSelectors.selectCurrentViewMode)
            ]),
            filter(([, photo]) => !!photo),
            map(([, photo, view]) =>
                PhotoActions.navigateToPhoto({
                    view,
                    categoryId: photo?.categoryId as number,
                    photoId: photo?.id as number,
                })
            )
        );
    });

    resetPhotoEffectsForNewPhotoEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setActivePhotoId),
            concatMap(() => {
                return of(PhotoActions.resetEffectsRequest());
            })
        );
    });

    resetPhotoEffectsEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.resetEffectsRequest),
            concatMap(() => {
                return of(
                    PhotoActions.updateEffectsRequest({
                        effects: DEFAULT_PHOTO_EFFECTS,
                    })
                );
            })
        );
    });

    toggleSlideshowEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.toggleSlideshowRequest),
            concatLatestFrom(() =>
                this.store.select(PhotoStoreSelectors.selectSlideshowIsPlaying)
            ),
            map(([, isPlaying]) => {
                if (isPlaying) {
                    return PhotoActions.stopSlideshowRequest();
                } else {
                    return PhotoActions.startSlideshowRequest();
                }
            })
        );
    });

    stopSlideshowAtEndOfListEffect$ = createEffect(() => {
        return combineLatest([
            this.store.select(PhotoStoreSelectors.selectIsActivePhotoLast),
            this.store.select(PhotoStoreSelectors.selectSlideshowIsPlaying),
        ]).pipe(
            filter(([isLast, isPlaying]) => isLast && isPlaying),
            map(() => PhotoActions.stopSlideshowRequest())
        );
    });

    stopSlideshowWhenDeselectingActivePhoto$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(PhotoActions.setActivePhotoId),
                concatLatestFrom(() =>
                    this.store.select(PhotoStoreSelectors.selectSlideshowIsPlaying)
                ),
                filter(([action, isSlideshowPlaying]) => !!isSlideshowPlaying && !action.id ),
                map(() => PhotoActions.stopSlideshowRequest())
            );
        }
    );

    runSlideshowEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.startSlideshowRequest),
            concatLatestFrom(() => this.photoPage.settings$),
            switchMap(([, settings]) => {
                return timer(
                    0,
                    settings.slideshowDisplayDurationSeconds * 1000
                ).pipe(
                    takeUntil(
                        this.actions$.pipe(
                            ofType(PhotoActions.stopSlideshowRequest)
                        )
                    ),
                    map(() => PhotoActions.moveNextRequest())
                );
            })
        );
    });

    periodicLoadOfRandomPhotoEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.startPeriodicRandomLoad),
            concatLatestFrom(() => this.randomPage.settings$),
            switchMap(([, settings]) => {
                return timer(
                    settings.slideshowDisplayDurationSeconds * 1000,
                    settings.slideshowDisplayDurationSeconds * 1000
                ).pipe(
                    takeUntil(
                        this.actions$.pipe(
                            ofType(PhotoActions.stopPeriodicRandomLoad)
                        )
                    ),
                    map(() => PhotoActions.loadRandomRequest())
                );
            })
        );
    });

    setCategoryIdForActivePhotoEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PhotoActions.setActivePhotoId),
            concatLatestFrom(() => this.store.select(PhotoStoreSelectors.selectActivePhoto)),
            map(([, photo]) => {
                const categoryId = photo?.categoryId ?? null;

                return PhotoActions.setCategoryIdForActivePhoto({ categoryId });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private photoPage: PhotoPageSettingsFacade,
        private randomPage: RandomPageSettingsFacade,
        @Inject(photoApiServiceToken) private api: PhotoApiService
    ) {}
}
