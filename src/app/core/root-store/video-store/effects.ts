import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import * as VideoStoreActions from './actions';

@Injectable()
export class VideoStoreEffects {
    constructor(
        private actions$: Actions,
        @Inject(videoApiServiceToken) private api: VideoApiService,
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoStoreActions.loadRequest),
            switchMap(action =>
                this.api.getVideosByCategory(action.categoryId)
                    .pipe(
                        map(videos => VideoStoreActions.loadSuccess({ videos: videos.items })),
                        catchError(error => of(VideoStoreActions.loadFailure({ error })))
                    )
            )
        )
    );

    loadRatingRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoStoreActions.loadRatingRequest),
            switchMap(action =>
                this.api.getRating(action.videoId)
                    .pipe(
                        map(rating => VideoStoreActions.loadRatingSuccess({ rating })),
                        catchError(error => of(VideoStoreActions.loadRatingFailure({ error })))
                    )
            )
        )
    );

    rateVideoRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoStoreActions.rateVideoRequest),
            switchMap(action =>
                this.api.rateVideo(action.videoId, action.userRating)
                    .pipe(
                        map(rating => VideoStoreActions.rateVideoSuccess({ rating })),
                        catchError(error => of(VideoStoreActions.rateVideoFailure({ error })))
                    )
            )
        )
    );

    loadCommentsRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoStoreActions.loadCommentsRequest),
            switchMap(action =>
                this.api.getComments(action.videoId)
                    .pipe(
                        map(comments => VideoStoreActions.loadCommentsSuccess({ comments: comments.items })),
                        catchError(error => of(VideoStoreActions.rateVideoFailure({ error })))
                    )
            )
        )
    );

    addCommentRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoStoreActions.addCommentRequest),
            concatMap(action =>
                this.api.addComment(action.videoId, action.comment)
                    .pipe(
                        map(result => VideoStoreActions.addCommentSuccess({ videoId: action.videoId })),
                        catchError(error => of(VideoStoreActions.addCommentFailure({ error })))
                    )
            )
        )
    );

    addCommentSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoStoreActions.addCommentSuccess),
            map(action => VideoStoreActions.loadCommentsRequest({ videoId: action.videoId }))
        )
    );
}
