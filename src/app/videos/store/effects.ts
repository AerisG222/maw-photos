import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap, debounceTime, filter, mergeMap } from 'rxjs/operators';

import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import * as VideoActions from './actions';
import * as VideoStoreSelectors from './selectors';
import { VideoCategoryStoreActions } from 'src/app/core/root-store';

@Injectable()
export class VideoStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.loadRequest),
            switchMap(action =>
                this.api.getVideosByCategory(action.categoryId)
                    .pipe(
                        map(videos => VideoActions.loadSuccess({ videos: videos.items })),
                        catchError(error => of(VideoActions.loadFailure({ error })))
                    )
            )
        );
    });

    loadRatingRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.loadRatingRequest),
            switchMap(action =>
                this.api.getRating(action.videoId)
                    .pipe(
                        map(rating => VideoActions.loadRatingSuccess({ rating })),
                        catchError(error => of(VideoActions.loadRatingFailure({ error })))
                    )
            )
        );
    });

    rateVideoRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.rateVideoRequest),
            concatMap(action =>
                this.api.rateVideo(action.videoId, action.userRating)
                    .pipe(
                        map(rating => VideoActions.rateVideoSuccess({ rating })),
                        catchError(error => of(VideoActions.rateVideoFailure({ error })))
                    )
            )
        );
    });

    loadCommentsRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.loadCommentsRequest),
            switchMap(action =>
                this.api.getComments(action.videoId)
                    .pipe(
                        map(comments => VideoActions.loadCommentsSuccess({ comments: comments.items })),
                        catchError(error => of(VideoActions.rateVideoFailure({ error })))
                    )
            )
        );
    });

    addCommentRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.addCommentRequest),
            concatMap(action =>
                this.api.addComment(action.videoId, action.comment)
                    .pipe(
                        map(result => VideoActions.addCommentSuccess({ videoId: action.videoId })),
                        catchError(error => of(VideoActions.addCommentFailure({ error })))
                    )
            )
        );
    });

    addCommentSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.addCommentSuccess),
            concatMap(action => of(VideoActions.loadCommentsRequest({ videoId: action.videoId })))
        );
    });

    loadGpsDetailRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.loadGpsDetailRequest),
            switchMap(action =>
                this.api.getGpsDetail(action.videoId)
                    .pipe(
                        map(gpsDetail => VideoActions.loadGpsDetailSuccess({ gpsDetail })),
                        catchError(error => of(VideoActions.loadGpsDetailFailure({ error })))
                    )
            )
        );
    });

    setGpsOverrideRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.setGpsCoordinateOverrideRequest),
            mergeMap(action =>
                this.api.setGpsCoordinateOverride(action.videoId, action.latLng)
                    .pipe(
                        map(gpsDetail => VideoActions.setGpsCoordinateOverrideSuccess({ videoId: action.videoId, gpsDetail })),
                        catchError(error => of(VideoActions.setGpsCoordinateOverrideFailure({ error })))
                    )
            )
        );
    });

    setGpsOverrideAndMoveNextRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.setGpsCoordinateOverrideAndMoveNextRequest),
            concatMap(action =>
                this.api.setGpsCoordinateOverride(action.videoId, action.latLng)
                    .pipe(
                        // eslint-disable-next-line
                        switchMap(gpsDetail => [
                            VideoActions.setGpsCoordinateOverrideSuccess({ videoId: action.videoId, gpsDetail }),
                            VideoActions.moveNextRequest()
                        ]),
                        catchError(error => of(VideoActions.setGpsCoordinateOverrideFailure({ error })))
                    )
            )
        );
    });

    updateCategoryAfterGpsCoordinateOverideSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.setGpsCoordinateOverrideSuccess),
            debounceTime(200),
            concatMap(action =>
                this.store$.pipe(
                    select(VideoStoreSelectors.selectAllVideos),
                    filter(videos => !!videos && !!videos[0]),  // sometimes will get an undefined videos[0] but not sure why
                    map(videos => {
                        const catId = videos[0].categoryId;
                        let isMissingGpsData = false;

                        for (const video of videos) {
                            if (video.latitude === null || video.longitude === null) {
                                isMissingGpsData = true;
                                break;
                            }
                        }

                        return VideoCategoryStoreActions.setIsMissingGpsData({ categoryId: catId, isMissingGpsData});
                    })
                ))
        );
    });

    unsetActivePhotoIdEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoActions.unsetActiveVideoId),
            map(action => {
                return VideoActions.setActiveVideoId({ id: null });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store$: Store,
        @Inject(videoApiServiceToken) private api: VideoApiService,
    ) {

    }
}
