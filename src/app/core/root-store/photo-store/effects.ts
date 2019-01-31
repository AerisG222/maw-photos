import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';

import * as photoActions from './actions';
import { photoApiServiceToken, PhotoApiService } from '../../services/photo-api.service';
import { RootStoreState } from '..';
import { PhotoRotation } from '../../models/photo-rotation.model';

@Injectable()
export class PhotoStoreEffects {
    constructor(
        private _actions$: Actions,
        private _store$: Store<RootStoreState.State>,
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.LoadRequestAction>(photoActions.ActionTypes.LOAD_REQUEST),
        switchMap(action =>
            this._api.getPhotosByCategory(action.payload.categoryId)
                .pipe(
                    map(photos => new photoActions.LoadSuccessAction({ photos: photos })),
                    catchError(error => of(new photoActions.LoadFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadRandomRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.LoadRandomRequestAction>(photoActions.ActionTypes.LOAD_RANDOM_REQUEST),
        switchMap(action =>
            this._api.getRandomPhoto()
                .pipe(
                    map(photo => new photoActions.LoadRandomSuccessAction({ photo: photo })),
                    catchError(error => of(new photoActions.LoadRandomFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    loadRatingRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.LoadRatingRequestAction>(photoActions.ActionTypes.LOAD_RATING_REQUEST),
        switchMap(action =>
            this._api.getPhotoRatingData(action.payload.photoId)
                .pipe(
                    map(rating => new photoActions.LoadRatingSuccessAction({ rating: rating})),
                    catchError(error => of(new photoActions.LoadRatingFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    ratePhotoRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.RatePhotoRequestAction>(photoActions.ActionTypes.RATE_PHOTO_REQUEST),
        concatMap(action =>
            this._api.ratePhoto(action.payload.photoId, action.payload.userRating)
                .pipe(
                    map(avgRating => new photoActions.RatePhotoSuccessAction({ averageRating: avgRating })),
                    catchError(error => of(new photoActions.RatePhotoFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    loadCommentsRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.LoadCommentsRequestAction>(photoActions.ActionTypes.LOAD_COMMENTS_REQUEST),
        switchMap(action =>
            this._api.getCommentsForPhoto(action.payload.photoId)
                .pipe(
                    map(comments => new photoActions.LoadCommentsSuccessAction({ comments: comments })),
                    catchError(error => of(new photoActions.RatePhotoFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    addCommentRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.AddCommentRequestAction>(photoActions.ActionTypes.ADD_COMMENT_REQUEST),
        switchMap(action =>
            this._api.addCommentForPhoto(action.payload.photoId, action.payload.comment)
                .pipe(
                    map(result => new photoActions.AddCommentSuccessAction({ photoId: action.payload.photoId })),
                    catchError(error => of(new photoActions.AddCommentFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    addCommentSuccessEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.AddCommentSuccessAction>(photoActions.ActionTypes.ADD_COMMENT_SUCCESS),
        map(action => new photoActions.LoadCommentsRequestAction({ photoId: action.payload.photoId }))
    );

    @Effect()
    loadExifRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.LoadExifRequestAction>(photoActions.ActionTypes.LOAD_EXIF_REQUEST),
        switchMap(action =>
            this._api.getPhotoExifData(action.payload.photoId)
                .pipe(
                    map(data => new photoActions.LoadExifSuccessAction({ exif: data })),
                    catchError(error => of(new photoActions.LoadExifFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    rotateClockwiseEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.RotateClockwiseRequestAction>(photoActions.ActionTypes.ROTATE_CLOCKWISE_REQUEST),
        withLatestFrom(this._store$),
        map(x => {
            const action = x[0];
            const state = <any>x[1];
            const effects = state.photos.currentPhotoEffects;
            const rotation = effects && effects.rotation ? effects.rotation : new PhotoRotation();

            rotation.rotateClockwise();

            return new photoActions.RotateSuccessAction({ newRotation: rotation });
        })
    );

    @Effect()
    rotateCounterClockwiseEffect$: Observable<Action> = this._actions$.pipe(
        ofType<photoActions.RotateCounterClockwiseRequestAction>(photoActions.ActionTypes.ROTATE_COUNTER_CLOCKWISE_REQUEST),
        withLatestFrom(this._store$),
        map(x => {
            const action = x[0];
            const state = <any>x[1];
            const effects = state.photos.currentPhotoEffects;
            const rotation = effects && effects.rotation ? effects.rotation : new PhotoRotation();

            rotation.rotateCounterClockwise();

            return new photoActions.RotateSuccessAction({ newRotation: rotation });
        })
    );
}
