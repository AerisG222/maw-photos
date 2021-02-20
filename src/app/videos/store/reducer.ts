import { createReducer, on } from '@ngrx/store';

import { Video } from '@models';
import { videoAdapter, initialState, State } from './state';
import * as VideoActions from './actions';

export const reducer = createReducer(
    initialState,
    on(
        VideoActions.addCommentRequest,
        VideoActions.loadCommentsRequest,
        VideoActions.loadGpsDetailRequest,
        VideoActions.loadRatingRequest,
        VideoActions.loadRequest,
        VideoActions.rateVideoRequest,
        VideoActions.setGpsCoordinateOverrideRequest,
        (state): State => ({
            ...state,
            isLoading: true,
            error: null,
        })
    ),
    on(
        VideoActions.loadCommentsSuccess,
        (state, { comments }): State => ({
            ...state,
            isLoading: false,
            error: null,
            activeVideoComments: comments,
        })
    ),
    on(
        VideoActions.addCommentFailure,
        VideoActions.loadCommentsFailure,
        VideoActions.loadFailure,
        VideoActions.loadGpsDetailFailure,
        VideoActions.loadRatingFailure,
        VideoActions.rateVideoFailure,
        VideoActions.setGpsCoordinateOverrideFailure,
        (state, { error }): State => ({
            ...state,
            isLoading: false,
            error,
        })
    ),
    on(
        VideoActions.loadRatingSuccess,
        (state, { rating }): State => ({
            ...state,
            isLoading: false,
            error: null,
            activeVideoRating: rating,
        })
    ),
    on(
        VideoActions.loadSuccess,
        (state, { videos }): State =>
            videoAdapter.setAll(videos, {
                ...state,
                isLoading: false,
                error: null,
            })
    ),
    on(
        VideoActions.setActiveVideoId,
        (state, { id }): State => ({
            ...state,
            activeVideoId: id,
        })
    ),
    on(
        VideoActions.rateVideoSuccess,
        (state, { rating }): State => ({
            ...state,
            isLoading: false,
            error: null,
            activeVideoRating: {
                userRating: rating.userRating,
                averageRating: Math.round(rating.averageRating),
            },
        })
    ),
    on(
        VideoActions.addCommentSuccess,
        (state): State => ({
            ...state,
            isLoading: false,
            error: null,
        })
    ),
    on(
        VideoActions.loadGpsDetailSuccess,
        (state, { gpsDetail }): State => ({
            ...state,
            isLoading: false,
            error: null,
            activeVideoGpsDetail: gpsDetail,
        })
    ),
    on(
        VideoActions.setGpsCoordinateOverrideSuccess,
        (state, { videoId, gpsDetail }): State => {
            const video = state.entities[videoId] as Video;
            const updatedState = {
                ...state,
                isLoading: false,
                error: null,
                activeVideoGpsDetail: gpsDetail,
            };

            if (video) {
                const newVideo = {
                    ...video,
                    latitude: gpsDetail.override.latitude,
                    longitude: gpsDetail.override.longitude,
                };

                return videoAdapter.upsertOne(newVideo, updatedState);
            } else {
                return updatedState;
            }
        }
    ),
    on(
        VideoActions.exitVideoArea,
        (): State =>
            videoAdapter.removeAll({
                ...initialState,
            })
    )
);
