import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import * as VideoActions from './actions';

@Injectable()
export class VideoStoreEffects {
    constructor(
        private actions$: Actions,
        @Inject(videoApiServiceToken) private api: VideoApiService,
    ) {

    }

    loadRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.loadRequest),
            switchMap(action =>
                this.api.getVideosByCategory(action.categoryId)
                    .pipe(
                        map(videos => VideoActions.loadSuccess({ videos: videos.items })),
                        catchError(error => of(VideoActions.loadFailure({ error })))
                    )
            )
        )
    );

    loadRatingRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.loadRatingRequest),
            switchMap(action =>
                this.api.getRating(action.videoId)
                    .pipe(
                        map(rating => VideoActions.loadRatingSuccess({ rating })),
                        catchError(error => of(VideoActions.loadRatingFailure({ error })))
                    )
            )
        )
    );

    rateVideoRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.rateVideoRequest),
            switchMap(action =>
                this.api.rateVideo(action.videoId, action.userRating)
                    .pipe(
                        map(rating => VideoActions.rateVideoSuccess({ rating })),
                        catchError(error => of(VideoActions.rateVideoFailure({ error })))
                    )
            )
        )
    );

    loadCommentsRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.loadCommentsRequest),
            switchMap(action =>
                this.api.getComments(action.videoId)
                    .pipe(
                        map(comments => VideoActions.loadCommentsSuccess({ comments: comments.items })),
                        catchError(error => of(VideoActions.rateVideoFailure({ error })))
                    )
            )
        )
    );

    addCommentRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.addCommentRequest),
            concatMap(action =>
                this.api.addComment(action.videoId, action.comment)
                    .pipe(
                        map(result => VideoActions.addCommentSuccess({ videoId: action.videoId })),
                        catchError(error => of(VideoActions.addCommentFailure({ error })))
                    )
            )
        )
    );

    addCommentSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.addCommentSuccess),
            map(action => VideoActions.loadCommentsRequest({ videoId: action.videoId }))
        )
    );

    loadGpsDetailRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.loadGpsDetailRequest),
            switchMap(action =>
                this.api.getGpsDetail(action.videoId)
                    .pipe(
                        map(gpsDetail => VideoActions.loadGpsDetailSuccess({ gpsDetail })),
                        catchError(error => of(VideoActions.loadGpsDetailFailure({ error })))
                    )
            )
        )
    );

    setGpsOverrideRequestEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VideoActions.setGpsCoordinateOverrideRequest),
            concatMap(action =>
                this.api.setGpsCoordinateOverride(action.videoId, action.latLng)
                    .pipe(
                        map(gpsDetail => VideoActions.setGpsCoordinateOverrideSuccess({ videoId: action.videoId, gpsDetail })),
                        catchError(error => of(VideoActions.setGpsCoordinateOverrideFailure({ error })))
                    )
            )
        )
    );
}
