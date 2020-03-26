import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, concatMap, mergeMap } from 'rxjs/operators';

import { PhotoRotation } from 'src/app/core/models/photo-rotation.model';
import { ExifFormatterService } from 'src/app/core/services/exif-formatter.service';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';
import * as PhotoActions from './actions';

@Injectable()
export class PhotoStoreEffects {
    constructor(
        private actions$: Actions,
        private exifFormatterService: ExifFormatterService,
        private store$: Store,
        @Inject(photoApiServiceToken) private api: PhotoApiService,
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.loadRequest),
            switchMap(action =>
                this.api.getPhotosByCategory(action.categoryId)
                    .pipe(
                        map(photos => PhotoActions.loadSuccess({ photos: photos.items })),
                        catchError(error => of(PhotoActions.loadFailure({ error })))
                    )
            )
        )
    );

    loadRandomRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.loadRandomRequest),
            switchMap(action =>
                this.api.getRandomPhoto()
                    .pipe(
                        map(photo => PhotoActions.loadRandomSuccess({ photo })),
                        catchError(error => of(PhotoActions.loadRandomFailure({ error })))
                    )
            )
        )
    );

    loadMultipleRandomRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.loadMultipleRandomRequest),
            switchMap(action =>
                this.api.getRandomPhotos(action.count)
                    .pipe(
                        map(photos => PhotoActions.loadMultipleRandomSuccess({ photos: photos.items })),
                        catchError(error => of(PhotoActions.loadMultipleRandomFailure({ error })))
                    )
            )
        )
    );

    loadRatingRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.loadRatingRequest),
            switchMap(action =>
                this.api.getRating(action.photoId)
                    .pipe(
                        map(rating => PhotoActions.loadRatingSuccess({ rating })),
                        catchError(error => of(PhotoActions.loadRatingFailure({ error })))
                    )
            )
        )
    );

    ratePhotoRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.ratePhotoRequest),
            switchMap(action =>
                this.api.ratePhoto(action.photoId, action.userRating)
                    .pipe(
                        map(rating => PhotoActions.ratePhotoSuccess({ rating })),
                        catchError(error => of(PhotoActions.ratePhotoFailure({ error })))
                    )
            )
        )
    );

    loadCommentsRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.loadCommentsRequest),
            switchMap(action =>
                this.api.getComments(action.photoId)
                    .pipe(
                        map(comments => PhotoActions.loadCommentsSuccess({ comments: comments.items })),
                        catchError(error => of(PhotoActions.ratePhotoFailure({ error })))
                    )
            )
        )
    );

    addCommentRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.addCommentRequest),
            concatMap(action =>
                this.api.addComment(action.photoId, action.comment)
                    .pipe(
                        map(result => PhotoActions.addCommentSuccess({ photoId: action.photoId })),
                        catchError(error => of(PhotoActions.addCommentFailure({ error })))
                    )
            )
        )
    );

    addCommentSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.addCommentSuccess),
            map(action => PhotoActions.loadCommentsRequest({ photoId: action.photoId }))
        )
    );

    loadExifRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.loadExifRequest),
            switchMap(action =>
                this.api.getExifData(action.photoId)
                    .pipe(
                        map(detail => this.exifFormatterService.format(detail)),
                        map(data => PhotoActions.loadExifSuccess({ exif: data })),
                        catchError(error => of(PhotoActions.loadExifFailure({ error })))
                    )
            )
        )
    );

    loadGpsDetailRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.loadGpsDetailRequest),
            switchMap(action =>
                this.api.getGpsDetail(action.photoId)
                    .pipe(
                        map(gpsDetail => PhotoActions.loadGpsDetailSuccess({ gpsDetail })),
                        catchError(error => of(PhotoActions.loadGpsDetailFailure({ error })))
                    )
            )
        )
    );

    setGpsOverrideRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideRequest),
            mergeMap(action =>
                this.api.setGpsCoordinateOverride(action.photoId, action.latLng)
                    .pipe(
                        map(gpsDetail => PhotoActions.setGpsCoordinateOverrideSuccess({ photoId: action.photoId, gpsDetail })),
                        catchError(error => of(PhotoActions.setGpsCoordinateOverrideFailure({ error })))
                    ),
                    24
            )
        )
    );

    setGpsOverrideAndMoveNextRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.setGpsCoordinateOverrideAndMoveNextRequest),
            mergeMap(action =>
                this.api.setGpsCoordinateOverride(action.photoId, action.latLng)
                    .pipe(
                        // tslint:disable-next-line: ngrx-no-multiple-actions-in-effects
                        switchMap(gpsDetail => [
                            PhotoActions.setGpsCoordinateOverrideSuccess({ photoId: action.photoId, gpsDetail }),
                            PhotoActions.moveNextRequest()
                        ]),
                        catchError(error => of(PhotoActions.setGpsCoordinateOverrideFailure({ error })))
                    )
            )
        )
    );

    rotateClockwiseEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.rotateClockwiseRequest),
            withLatestFrom(this.store$),
            map(x => {
                const action = x[0];
                const state = x[1] as any;
                const effects = state.photos.currentPhotoEffects;
                const rotation = effects && effects.rotation ? new PhotoRotation(effects.rotation.klass) : new PhotoRotation();

                rotation.rotateClockwise();

                return PhotoActions.rotateSuccess({ newRotation: rotation });
            })
        )
    );

    rotateCounterClockwiseEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhotoActions.rotateCounterClockwiseRequest),
            withLatestFrom(this.store$),
            map(x => {
                const action = x[0];
                const state = x[1] as any;
                const effects = state.photos.currentPhotoEffects;
                const rotation = effects && effects.rotation ? new PhotoRotation(effects.rotation.klass) : new PhotoRotation();

                rotation.rotateCounterClockwise();

                return PhotoActions.rotateSuccess({ newRotation: rotation });
            })
        )
    );
}
