import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { switchMap, catchError, map, concatMap, debounceTime, filter, mergeMap } from 'rxjs/operators';

import { videoApiServiceToken, VideoApiService } from 'src/app/core/services/video-api.service';
import * as VideoStoreActions from './actions';
import * as VideoStoreSelectors from './selectors';
import { VideoCategoryStoreActions } from 'src/app/core/root-store';

@Injectable()
export class VideoStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadRequest),
            switchMap(action =>
                this.api.getVideosByCategory(action.categoryId)
                    .pipe(
                        map(videos => VideoStoreActions.loadSuccess({ videos: videos.items })),
                        catchError(error => of(VideoStoreActions.loadFailure({ error })))
                    )
            )
        );
    });

    loadRatingRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadRatingRequest),
            switchMap(action =>
                this.api.getRating(action.videoId)
                    .pipe(
                        map(rating => VideoStoreActions.loadRatingSuccess({ rating })),
                        catchError(error => of(VideoStoreActions.loadRatingFailure({ error })))
                    )
            )
        );
    });

    loadRatingsForVideoWhenVisible$ = createEffect(() => {
        return combineLatest([
                this.actions$.pipe(ofType(VideoStoreActions.setActiveVideoId)),
                this.store.select(VideoStoreSelectors.isRatingCardVisible)
            ])
            .pipe(
                filter(([action, isVisible]) => !!action.id && isVisible),
                map(([action, isVisible ]) => VideoStoreActions.loadRatingRequest({ videoId: action.id as number }))
            );
    });

    rateVideoRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.rateVideoRequest),
            concatMap(action =>
                this.api.rateVideo(action.videoId, action.userRating)
                    .pipe(
                        map(rating => VideoStoreActions.rateVideoSuccess({ rating })),
                        catchError(error => of(VideoStoreActions.rateVideoFailure({ error })))
                    )
            )
        );
    });

    loadCommentsRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadCommentsRequest),
            switchMap(action =>
                this.api.getComments(action.videoId)
                    .pipe(
                        map(comments => VideoStoreActions.loadCommentsSuccess({ comments: comments.items })),
                        catchError(error => of(VideoStoreActions.rateVideoFailure({ error })))
                    )
            )
        );
    });

    loadCommentsForVideoWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.actions$.pipe(ofType(VideoStoreActions.setActiveVideoId)),
            this.store.select(VideoStoreSelectors.isCommentCardVisible)
        ])
        .pipe(
            filter(([action, isVisible]) => !!action.id && isVisible),
            map(([action, isVisible ]) => VideoStoreActions.loadCommentsRequest({ videoId: action.id as number }))
        );
    });

    addCommentRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.addCommentRequest),
            concatMap(action =>
                this.api.addComment(action.videoId, action.comment)
                    .pipe(
                        map(result => VideoStoreActions.addCommentSuccess({ videoId: action.videoId })),
                        catchError(error => of(VideoStoreActions.addCommentFailure({ error })))
                    )
            )
        );
    });

    addCommentSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.addCommentSuccess),
            concatMap(action => of(VideoStoreActions.loadCommentsRequest({ videoId: action.videoId })))
        );
    });

    loadGpsDetailRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadGpsDetailRequest),
            switchMap(action =>
                this.api.getGpsDetail(action.videoId)
                    .pipe(
                        map(gpsDetail => VideoStoreActions.loadGpsDetailSuccess({ gpsDetail })),
                        catchError(error => of(VideoStoreActions.loadGpsDetailFailure({ error })))
                    )
            )
        );
    });

    loadGpsDetailForVideoMetadataEditorWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.actions$.pipe(ofType(VideoStoreActions.setActiveVideoId)),
            this.store.select(VideoStoreSelectors.isMetadataEditorCardVisible)
        ])
        .pipe(
            filter(([action, isVisible]) => !!action.id && isVisible),
            map(([action, isVisible ]) => VideoStoreActions.loadGpsDetailRequest({ videoId: action.id as number }))
        );
    });

    setGpsOverrideRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.setGpsCoordinateOverrideRequest),
            mergeMap(action =>
                this.api.setGpsCoordinateOverride(action.videoId, action.latLng)
                    .pipe(
                        map(gpsDetail => VideoStoreActions.setGpsCoordinateOverrideSuccess({ videoId: action.videoId, gpsDetail })),
                        catchError(error => of(VideoStoreActions.setGpsCoordinateOverrideFailure({ error })))
                    )
            )
        );
    });

    setGpsOverrideAndMoveNextRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest),
            concatMap(action =>
                this.api.setGpsCoordinateOverride(action.videoId, action.latLng)
                    .pipe(
                        // eslint-disable-next-line
                        switchMap(gpsDetail => [
                            VideoStoreActions.setGpsCoordinateOverrideSuccess({ videoId: action.videoId, gpsDetail }),
                            VideoStoreActions.moveNextRequest()
                        ]),
                        catchError(error => of(VideoStoreActions.setGpsCoordinateOverrideFailure({ error })))
                    )
            )
        );
    });

    updateCategoryAfterGpsCoordinateOverideSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.setGpsCoordinateOverrideSuccess),
            debounceTime(200),
            concatMap(action =>
                this.store
                    .select(VideoStoreSelectors.allVideos)
                    .pipe(
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
                    )
            )
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        @Inject(videoApiServiceToken) private api: VideoApiService,
    ) {

    }
}
