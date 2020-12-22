import { createReducer, on } from '@ngrx/store';

import { Video } from 'src/app/models/video.model';
import { videoAdapter, initialState, State } from './state';
import * as VideoActions from './actions';

export const reducer = createReducer(
    initialState,
    on(VideoActions.clearRequest, state =>
        videoAdapter.removeAll({
            ...state,
            firstVideo: null,
            lastVideo: null,
            activeVideo: null
        })
    ),
    on(VideoActions.loadCommentsRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadCommentsSuccess, (state, { comments }) => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoComments: comments
    })),
    on(VideoActions.loadCommentsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.loadRatingRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadRatingSuccess, (state, { rating }) => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoRating: rating
    })),
    on(VideoActions.loadRatingFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.loadRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadSuccess, (state, { videos }) =>
        videoAdapter.setAll(videos, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(VideoActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.setActiveVideoId, (state, { id }) => ({
        ...state,
        activeVideoId: id
    })),
    on(VideoActions.rateVideoRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.rateVideoSuccess, (state, { rating }) => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoRating: {
            userRating: rating.userRating,
            averageRating: Math.round(rating.averageRating)
        }
    })),
    on(VideoActions.rateVideoFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.addCommentRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.addCommentSuccess, state => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(VideoActions.addCommentFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.loadGpsDetailRequest, (state, { videoId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadGpsDetailSuccess, (state, { gpsDetail }) => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoGpsDetail: gpsDetail
    })),
    on(VideoActions.loadGpsDetailFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.setGpsCoordinateOverrideRequest, (state, { videoId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.setGpsCoordinateOverrideSuccess, (state, { videoId, gpsDetail }) => {
        const video = state.entities[videoId] as Video;
        const updatedState = ({
            ...state,
            isLoading: false,
            error: null,
            activeVideoGpsDetail: gpsDetail
        });

        if (!!video) {
            const newVideo = ({
                ...video,
                latitude: gpsDetail.override.latitude,
                longitude: gpsDetail.override.longitude
            });

            return videoAdapter.upsertOne(newVideo, updatedState);
        } else {
            return updatedState;
        }
    }),
    on(VideoActions.setGpsCoordinateOverrideFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
);
