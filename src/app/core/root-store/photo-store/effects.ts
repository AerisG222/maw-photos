import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { PhotoRotation } from 'src/app/core/models/photo-rotation.model';
import { ExifFormatterService } from 'src/app/core/services/exif-formatter.service';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';
import * as photoActions from './actions';
import { RootStoreState } from '..';

@Injectable()
export class PhotoStoreEffects {
    constructor(
        private actions$: Actions,
        private exifFormatterService: ExifFormatterService,
        private store$: Store<RootStoreState.State>,
        @Inject(photoApiServiceToken) private api: PhotoApiService,
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.LoadRequestAction>(photoActions.ActionTypes.LOAD_REQUEST),
        switchMap(action =>
            this.api.getPhotosByCategory(action.payload.categoryId)
                .pipe(
                    map(photos => new photoActions.LoadSuccessAction({ photos: photos.items })),
                    catchError(error => of(new photoActions.LoadFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadRandomRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.LoadRandomRequestAction>(photoActions.ActionTypes.LOAD_RANDOM_REQUEST),
        switchMap(action =>
            this.api.getRandomPhoto()
                .pipe(
                    map(photo => new photoActions.LoadRandomSuccessAction({ photo })),
                    catchError(error => of(new photoActions.LoadRandomFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadMultipleRandomRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.LoadMultipleRandomRequestAction>(photoActions.ActionTypes.LOAD_MULTIPLE_RANDOM_REQUEST),
        switchMap(action =>
            this.api.getRandomPhotos(action.payload.count)
                .pipe(
                    map(photos => new photoActions.LoadMultipleRandomSuccessAction({ photos: photos.items })),
                    catchError(error => of(new photoActions.LoadMultipleRandomFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadRatingRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.LoadRatingRequestAction>(photoActions.ActionTypes.LOAD_RATING_REQUEST),
        switchMap(action =>
            this.api.getRating(action.payload.photoId)
                .pipe(
                    map(rating => new photoActions.LoadRatingSuccessAction({ rating })),
                    catchError(error => of(new photoActions.LoadRatingFailureAction({ error })))
                )
        )
    );

    @Effect()
    ratePhotoRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.RatePhotoRequestAction>(photoActions.ActionTypes.RATE_PHOTO_REQUEST),
        switchMap(action =>
            this.api.ratePhoto(action.payload.photoId, action.payload.userRating)
                .pipe(
                    map(rating => new photoActions.RatePhotoSuccessAction({ rating })),
                    catchError(error => of(new photoActions.RatePhotoFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadCommentsRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.LoadCommentsRequestAction>(photoActions.ActionTypes.LOAD_COMMENTS_REQUEST),
        switchMap(action =>
            this.api.getComments(action.payload.photoId)
                .pipe(
                    map(comments => new photoActions.LoadCommentsSuccessAction({ comments: comments.items })),
                    catchError(error => of(new photoActions.RatePhotoFailureAction({ error })))
                )
        )
    );

    @Effect()
    addCommentRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.AddCommentRequestAction>(photoActions.ActionTypes.ADD_COMMENT_REQUEST),
        switchMap(action =>
            this.api.addComment(action.payload.photoId, action.payload.comment)
                .pipe(
                    map(result => new photoActions.AddCommentSuccessAction({ photoId: action.payload.photoId })),
                    catchError(error => of(new photoActions.AddCommentFailureAction({ error })))
                )
        )
    );

    @Effect()
    addCommentSuccessEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.AddCommentSuccessAction>(photoActions.ActionTypes.ADD_COMMENT_SUCCESS),
        map(action => new photoActions.LoadCommentsRequestAction({ photoId: action.payload.photoId }))
    );

    @Effect()
    loadExifRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.LoadExifRequestAction>(photoActions.ActionTypes.LOAD_EXIF_REQUEST),
        switchMap(action =>
            this.api.getExifData(action.payload.photoId)
                .pipe(
                    map(detail => this.exifFormatterService.format(detail)),
                    map(data => new photoActions.LoadExifSuccessAction({ exif: data })),
                    catchError(error => of(new photoActions.LoadExifFailureAction({ error })))
                )
        )
    );

    @Effect()
    rotateClockwiseEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.RotateClockwiseRequestAction>(photoActions.ActionTypes.ROTATE_CLOCKWISE_REQUEST),
        withLatestFrom(this.store$),
        map(x => {
            const action = x[0];
            const state = x[1] as any;
            const effects = state.photos.currentPhotoEffects;
            const rotation = effects && effects.rotation ? effects.rotation : new PhotoRotation();

            rotation.rotateClockwise();

            return new photoActions.RotateSuccessAction({ newRotation: rotation });
        })
    );

    @Effect()
    rotateCounterClockwiseEffect$: Observable<Action> = this.actions$.pipe(
        ofType<photoActions.RotateCounterClockwiseRequestAction>(photoActions.ActionTypes.ROTATE_COUNTER_CLOCKWISE_REQUEST),
        withLatestFrom(this.store$),
        map(x => {
            const action = x[0];
            const state = x[1] as any;
            const effects = state.photos.currentPhotoEffects;
            const rotation = effects && effects.rotation ? effects.rotation : new PhotoRotation();

            rotation.rotateCounterClockwise();

            return new photoActions.RotateSuccessAction({ newRotation: rotation });
        })
    );
}
