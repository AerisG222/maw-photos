import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import * as videoActions from './actions';

@Injectable()
export class VideoStoreEffects {
    constructor(
        private _actions$: Actions,
        @Inject(videoApiServiceToken) private _api: VideoApiService,
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<videoActions.LoadRequestAction>(videoActions.ActionTypes.LOAD_REQUEST),
        switchMap(action =>
            this._api.getVideosByCategory(action.payload.categoryId)
                .pipe(
                    map(videos => new videoActions.LoadSuccessAction({ videos: videos })),
                    catchError(error => of(new videoActions.LoadFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadRatingRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<videoActions.LoadRatingRequestAction>(videoActions.ActionTypes.LOAD_RATING_REQUEST),
        switchMap(action =>
            this._api.getRating(action.payload.videoId)
                .pipe(
                    map(rating => new videoActions.LoadRatingSuccessAction({ rating: rating})),
                    catchError(error => of(new videoActions.LoadRatingFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    rateVideoRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<videoActions.RateVideoRequestAction>(videoActions.ActionTypes.RATE_VIDEO_REQUEST),
        concatMap(action =>
            this._api.rateVideo(action.payload.videoId, action.payload.userRating)
                .pipe(
                    map(avgRating => new videoActions.RateVideoSuccessAction({ averageRating: avgRating })),
                    catchError(error => of(new videoActions.RateVideoFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    loadCommentsRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<videoActions.LoadCommentsRequestAction>(videoActions.ActionTypes.LOAD_COMMENTS_REQUEST),
        switchMap(action =>
            this._api.getComments(action.payload.videoId)
                .pipe(
                    map(comments => new videoActions.LoadCommentsSuccessAction({ comments: comments })),
                    catchError(error => of(new videoActions.RateVideoFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    addCommentRequestEffect$: Observable<Action> = this._actions$.pipe(
        ofType<videoActions.AddCommentRequestAction>(videoActions.ActionTypes.ADD_COMMENT_REQUEST),
        switchMap(action =>
            this._api.addComment(action.payload.videoId, action.payload.comment)
                .pipe(
                    map(result => new videoActions.AddCommentSuccessAction({ videoId: action.payload.videoId })),
                    catchError(error => of(new videoActions.AddCommentFailureAction({ error: error })))
                )
        )
    );

    @Effect()
    addCommentSuccessEffect$: Observable<Action> = this._actions$.pipe(
        ofType<videoActions.AddCommentSuccessAction>(videoActions.ActionTypes.ADD_COMMENT_SUCCESS),
        map(action => new videoActions.LoadCommentsRequestAction({ videoId: action.payload.videoId }))
    );
}
