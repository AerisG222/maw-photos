import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import {
    switchMap,
    catchError,
    map,
    concatMap,
    debounceTime,
    filter,
    mergeMap,
} from 'rxjs/operators';

import { videoApiServiceToken, VideoApiService } from '@core/services';
import * as VideoStoreActions from './actions';
import * as VideoStoreSelectors from './selectors';
import { VideoCategoryStoreActions } from '@core/root-store';
import { CategoryGpsStatus, httpErrorHandler } from '@models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class VideoStoreEffects {
    loadRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadRequest),
            switchMap((action) =>
                this.api.getVideosByCategory(action.categoryId).pipe(
                    map((videos) =>
                        VideoStoreActions.loadSuccess({ videos: videos.items })
                    ),
                    catchError((error) =>
                        of(
                            VideoStoreActions.loadFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadRatingRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadRatingRequest),
            switchMap((action) =>
                this.api.getRating(action.videoId).pipe(
                    map((rating) =>
                        VideoStoreActions.loadRatingSuccess({ rating })
                    ),
                    catchError((error) =>
                        of(
                            VideoStoreActions.loadRatingFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadRatingsForVideoWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.store.select(VideoStoreSelectors.selectActiveVideoId),
            this.store.select(VideoStoreSelectors.selectIsRatingCardVisible),
        ]).pipe(
            filter(([videoId, isVisible]) => !!videoId && isVisible),
            map(([videoId]) =>
                VideoStoreActions.loadRatingRequest({
                    videoId: videoId as number,
                })
            )
        );
    });

    rateVideoRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.rateVideoRequest),
            concatMap((action) =>
                this.api.rateVideo(action.videoId, action.userRating).pipe(
                    map((rating) =>
                        VideoStoreActions.rateVideoSuccess({ rating })
                    ),
                    catchError((error) =>
                        of(
                            VideoStoreActions.rateVideoFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadCommentsRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadCommentsRequest),
            switchMap((action) =>
                this.api.getComments(action.videoId).pipe(
                    map((comments) =>
                        VideoStoreActions.loadCommentsSuccess({
                            comments: comments.items,
                        })
                    ),
                    catchError((error) =>
                        of(
                            VideoStoreActions.rateVideoFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadCommentsForVideoWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.store.select(VideoStoreSelectors.selectActiveVideoId),
            this.store.select(VideoStoreSelectors.selectIsCommentCardVisible),
        ]).pipe(
            filter(([videoId, isVisible]) => !!videoId && isVisible),
            map(([videoId]) =>
                VideoStoreActions.loadCommentsRequest({
                    videoId: videoId as number,
                })
            )
        );
    });

    addCommentRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.addCommentRequest),
            concatMap((action) =>
                this.api.addComment(action.videoId, action.comment).pipe(
                    map(() =>
                        VideoStoreActions.addCommentSuccess({
                            videoId: action.videoId,
                        })
                    ),
                    catchError((error) =>
                        of(
                            VideoStoreActions.addCommentFailure({
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
            ofType(VideoStoreActions.addCommentSuccess),
            concatMap((action) =>
                of(
                    VideoStoreActions.loadCommentsRequest({
                        videoId: action.videoId,
                    })
                )
            )
        );
    });

    loadGpsDetailRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.loadGpsDetailRequest),
            switchMap((action) =>
                this.api.getGpsDetail(action.videoId).pipe(
                    map((gpsDetail) =>
                        VideoStoreActions.loadGpsDetailSuccess({ gpsDetail })
                    ),
                    catchError((error) =>
                        of(
                            VideoStoreActions.loadGpsDetailFailure({
                                error: httpErrorHandler(error as HttpErrorResponse),
                            })
                        )
                    )
                )
            )
        );
    });

    loadGpsDetailForVideoMetadataEditorWhenVisible$ = createEffect(() => {
        return combineLatest([
            this.store.select(VideoStoreSelectors.selectActiveVideoId),
            this.store.select(VideoStoreSelectors.selectIsMetadataEditorCardVisible),
        ]).pipe(
            filter(([videoId, isVisible]) => !!videoId && isVisible),
            map(([videoId]) =>
                VideoStoreActions.loadGpsDetailRequest({
                    videoId: videoId as number,
                })
            )
        );
    });

    setGpsOverrideRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.setGpsCoordinateOverrideRequest),
            mergeMap((action) =>
                this.api
                    .setGpsCoordinateOverride(action.videoId, action.latLng)
                    .pipe(
                        map((gpsDetail) =>
                            VideoStoreActions.setGpsCoordinateOverrideSuccess({
                                videoId: action.videoId,
                                gpsDetail,
                            })
                        ),
                        catchError((error) =>
                            of(
                                VideoStoreActions.setGpsCoordinateOverrideFailure(
                                    { error: httpErrorHandler(error as HttpErrorResponse) }
                                )
                            )
                        )
                    )
            )
        );
    });

    setGpsOverrideAndMoveNextRequestEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest
            ),
            concatMap((action) =>
                this.api
                    .setGpsCoordinateOverride(action.videoId, action.latLng)
                    .pipe(
                        // eslint-disable-next-line
                        switchMap(gpsDetail => [
                            VideoStoreActions.setGpsCoordinateOverrideSuccess({
                                videoId: action.videoId,
                                gpsDetail,
                            }),
                            VideoStoreActions.moveNextRequest(),
                        ]),
                        catchError((error) =>
                            of(
                                VideoStoreActions.setGpsCoordinateOverrideFailure(
                                    { error: httpErrorHandler(error as HttpErrorResponse) }
                                )
                            )
                        )
                    )
            )
        );
    });

    updateCategoryAfterGpsCoordinateOverideSuccessEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.setGpsCoordinateOverrideSuccess),
            debounceTime(200),
            concatMap(() =>
                this.store.select(VideoStoreSelectors.selectCategoryGpsStatus).pipe(
                    filter((status) => !!status),
                    // eslint-disable-next-line ngrx/avoid-mapping-selectors
                    map((status) =>
                        VideoCategoryStoreActions.setIsMissingGpsData(
                            status as CategoryGpsStatus
                        )
                    )
                )
            )
        );
    });

    moveNextEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.moveNextRequest),
            concatLatestFrom(() => this.store.select(VideoStoreSelectors.selectNextVideo)),
            filter(([, video]) => !!video),
            map(([, video]) =>
                VideoStoreActions.navigateToVideo({
                    categoryId: video?.categoryId as number,
                    videoId: video?.id as number,
                })
            )
        );
    });

    movePreviousEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VideoStoreActions.movePreviousRequest),
            concatLatestFrom(() =>
                this.store.select(VideoStoreSelectors.selectPreviousVideo)
            ),
            filter(([, video]) => !!video),
            map(([, video]) =>
                VideoStoreActions.navigateToVideo({
                    categoryId: video?.categoryId as number,
                    videoId: video?.id as number,
                })
            )
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        @Inject(videoApiServiceToken) private api: VideoApiService
    ) {}
}
