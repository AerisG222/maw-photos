import { createReducer, on } from '@ngrx/store';

import { Video } from 'src/app/models/video.model';
import { videoAdapter, initialState, State } from './state';
import * as VideoActions from './actions';

export const reducer = createReducer(
    initialState,
    on(VideoActions.loadCommentsRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadCommentsSuccess, (state, { comments }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoComments: comments
    })),
    on(VideoActions.loadCommentsFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.loadRatingRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadRatingSuccess, (state, { rating }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoRating: rating
    })),
    on(VideoActions.loadRatingFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.loadRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadSuccess, (state, { videos }): State =>
        videoAdapter.setAll(videos, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(VideoActions.loadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.setActiveVideoId, (state, { id }): State => ({
        ...state,
        activeVideoId: id
    })),
    on(VideoActions.rateVideoRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.rateVideoSuccess, (state, { rating }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoRating: {
            userRating: rating.userRating,
            averageRating: Math.round(rating.averageRating)
        }
    })),
    on(VideoActions.rateVideoFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.addCommentRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.addCommentSuccess, (state): State => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(VideoActions.addCommentFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.loadGpsDetailRequest, (state, { videoId }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.loadGpsDetailSuccess, (state, { gpsDetail }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activeVideoGpsDetail: gpsDetail
    })),
    on(VideoActions.loadGpsDetailFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.setGpsCoordinateOverrideRequest, (state, { videoId }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.setGpsCoordinateOverrideSuccess, (state, { videoId, gpsDetail }): State => {
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
    on(VideoActions.setGpsCoordinateOverrideFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(VideoActions.exitVideoArea, (state): State =>
        videoAdapter.removeAll({
            ...initialState
        })
    )
);
