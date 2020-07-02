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
            currentVideo: null
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
        currentVideoComments: comments
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
        currentVideoRating: rating
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
    on(VideoActions.setCurrent, (state, { video }) => ({
        ...state,
        currentVideo: video
    })),
    on(VideoActions.clearCurrent, (state) => ({
        ...state,
        currentVideo: null
    })),
    on(VideoActions.moveNextRequest, state => getStateForNewVideo(state, nextVideo(state))),
    on(VideoActions.movePreviousRequest, state => getStateForNewVideo(state, previousVideo(state))),

    on(VideoActions.rateVideoRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(VideoActions.rateVideoSuccess, (state, { rating }) => ({
        ...state,
        isLoading: false,
        error: null,
        currentVideoRating: {
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
        currentVideoGpsDetail: gpsDetail
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
        const video = getVideoWithId(state, videoId);
        const updatedState = ({
            ...state,
            isLoading: false,
            error: null,
            currentVideoGpsDetail: gpsDetail
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

function nextVideo(state: State): Video {
    return getVideoAtIndex(state, incrementCurrentIndexWithinBounds(state, 1));
}

function previousVideo(state: State): Video {
    return getVideoAtIndex(state, incrementCurrentIndexWithinBounds(state, -1));
}

function getVideoAtIndex(state: State, idx: number): Video {
    // entities are keyed by id
    return state.entities[state.ids[idx]] as Video;
}

function incrementCurrentIndexWithinBounds(state: State, direction: number): number {
    const lastIdx = state.ids.length - 1;
    const idx = getCurrentIndex(state) + direction;

    return Math.max(0, Math.min(idx, lastIdx));
}

function getCurrentIndex(state: State): number {
    return (state.ids as number[]).findIndex(id => id === state.currentVideo?.id);
}

function getVideoWithId(state: State, id: number): Video {
    return state.entities[id] as Video;
}

function getStateForNewVideo(state: State, newVideo: Video): State {
    if (!!newVideo &&
        !!state.currentVideo &&
        newVideo.id === state.currentVideo.id) {
        return state;
    }

    return {
        ...state,
        currentVideo: newVideo
    };
}
