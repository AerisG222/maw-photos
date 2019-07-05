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
        private actions$: Actions,
        @Inject(videoApiServiceToken) private api: VideoApiService,
    ) {

    }

    @Effect()
    loadRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<videoActions.LoadRequestAction>(videoActions.ActionTypes.LOAD_REQUEST),
        switchMap(action =>
            this.api.getVideosByCategory(action.payload.categoryId)
                .pipe(
                    map(videos => new videoActions.LoadSuccessAction({ videos: videos.items })),
                    catchError(error => of(new videoActions.LoadFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadRatingRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<videoActions.LoadRatingRequestAction>(videoActions.ActionTypes.LOAD_RATING_REQUEST),
        switchMap(action =>
            this.api.getRating(action.payload.videoId)
                .pipe(
                    map(rating => new videoActions.LoadRatingSuccessAction({ rating })),
                    catchError(error => of(new videoActions.LoadRatingFailureAction({ error })))
                )
        )
    );

    @Effect()
    rateVideoRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<videoActions.RateVideoRequestAction>(videoActions.ActionTypes.RATE_VIDEO_REQUEST),
        switchMap(action =>
            this.api.rateVideo(action.payload.videoId, action.payload.userRating)
                .pipe(
                    map(rating => new videoActions.RateVideoSuccessAction({ rating })),
                    catchError(error => of(new videoActions.RateVideoFailureAction({ error })))
                )
        )
    );

    @Effect()
    loadCommentsRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<videoActions.LoadCommentsRequestAction>(videoActions.ActionTypes.LOAD_COMMENTS_REQUEST),
        switchMap(action =>
            this.api.getComments(action.payload.videoId)
                .pipe(
                    map(comments => new videoActions.LoadCommentsSuccessAction({ comments: comments.items })),
                    catchError(error => of(new videoActions.RateVideoFailureAction({ error })))
                )
        )
    );

    @Effect()
    addCommentRequestEffect$: Observable<Action> = this.actions$.pipe(
        ofType<videoActions.AddCommentRequestAction>(videoActions.ActionTypes.ADD_COMMENT_REQUEST),
        switchMap(action =>
            this.api.addComment(action.payload.videoId, action.payload.comment)
                .pipe(
                    map(result => new videoActions.AddCommentSuccessAction({ videoId: action.payload.videoId })),
                    catchError(error => of(new videoActions.AddCommentFailureAction({ error })))
                )
        )
    );

    @Effect()
    addCommentSuccessEffect$: Observable<Action> = this.actions$.pipe(
        ofType<videoActions.AddCommentSuccessAction>(videoActions.ActionTypes.ADD_COMMENT_SUCCESS),
        map(action => new videoActions.LoadCommentsRequestAction({ videoId: action.payload.videoId }))
    );
}
