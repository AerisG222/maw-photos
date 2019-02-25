import { Video } from 'src/app/core/models/video.model';
import { Actions, ActionTypes } from './actions';
import { videoAdapter, initialState, State } from './state';

export function videoReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.CLEAR_REQUEST: {
            return videoAdapter.removeAll({
                ...state,
                firstVideo: null,
                lastVideo: null,
                currentVideo: null
            });
        }
        case ActionTypes.LOAD_COMMENTS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_COMMENTS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                currentVideoComments: action.payload.comments
            };
        }
        case ActionTypes.LOAD_COMMENTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.LOAD_RATING_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_RATING_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                currentVideoRating: action.payload.rating
            };
        }
        case ActionTypes.LOAD_RATING_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.LOAD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_SUCCESS: {
            const entities = videoAdapter.addAll(action.payload.videos, {
                ...state,
                isLoading: false,
                error: null
            });

            entities.firstVideo = entities.entities[entities.ids[0]],
            entities.lastVideo = entities.entities[entities.ids[entities.ids.length - 1]];

            return entities;
        }
        case ActionTypes.LOAD_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.SET_CURRENT: {
            return {
                ...state,
                currentVideo: action.payload.video
            };
        }
        case ActionTypes.MOVE_NEXT_REQUEST: {
            const newVideo = nextVideo(state);

            if (newVideo != null &&
                state.currentVideo != null &&
                newVideo.id === state.currentVideo.id) {
                return state;
            }

            return {
                ...state,
                currentVideo: newVideo
            };
        }
        case ActionTypes.MOVE_PREVIOUS_REQUEST: {
            const newVideo = previousVideo(state);

            if (newVideo != null &&
                state.currentVideo != null &&
                newVideo.id === state.currentVideo.id) {
                return state;
            }

            return {
                ...state,
                currentVideo: newVideo
            };
        }
        case ActionTypes.RATE_VIDEO_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null,
                currentVideoRating: {
                    ...state.currentVideoRating,
                    userRating: action.payload.userRating
                }
            };
        }
        case ActionTypes.RATE_VIDEO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                currentVideoRating: {
                    ...state.currentVideoRating,
                    averageRating: Math.round(action.payload.averageRating)
                }
            };
        }
        case ActionTypes.RATE_VIDEO_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.ADD_COMMENT_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.ADD_COMMENT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null
            };
        }
        case ActionTypes.ADD_COMMENT_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.TOGGLE_FULLSCREEN_REQUEST: {
            return {
                ...state,
                isFullscreenView: !state.isFullscreenView
            };
        }
        case ActionTypes.ENTER_FULLSCREEN_REQUEST: {
            return {
                ...state,
                isFullscreenView: true
            };
        }
        case ActionTypes.EXIT_FULLSCREEN_REQUEST: {
            return {
                ...state,
                isFullscreenView: false
            };
        }
        default: {
            return state;
        }
    }
}

function nextVideo(state: State): Video {
    return getVideoAtIndex(state, incrementCurrentIndexWithinBounds(state, 1));
}

function previousVideo(state: State): Video {
    return getVideoAtIndex(state, incrementCurrentIndexWithinBounds(state, -1));
}

function getVideoAtIndex(state: State, idx: number) {
    // entities are keyed by id
    return state.entities[state.ids[idx]];
}

function incrementCurrentIndexWithinBounds(state: State, direction: number): number {
    const lastIdx = state.ids.length - 1;
    const idx = getCurrentIndex(state) + direction;

    return Math.max(0, Math.min(idx, lastIdx));
}

function getCurrentIndex(state: State): number {
    return (<number[]> state.ids).findIndex(id => id === state.currentVideo.id);
}
