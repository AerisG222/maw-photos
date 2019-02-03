import { Actions, ActionTypes } from './actions';
import { photoAdapter, initialState, State } from './state';
import { Photo } from '../../models/photo.model';
import { PhotoRotation } from '../../models/photo-rotation.model';

export function photoReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.CLEAR_REQUEST: {
            return photoAdapter.removeAll({
                ...state,
                firstPhoto: null,
                lastPhoto: null,
                currentPhoto: null
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
                currentPhotoComments: action.payload.comments
            };
        }
        case ActionTypes.LOAD_COMMENTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.LOAD_RANDOM_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_RANDOM_SUCCESS: {
            const entities = photoAdapter.addOne(action.payload.photo, {
                ...state,
                isLoading: false,
                error: null
            });

            entities.firstPhoto = entities.entities[entities.ids[0]];
            entities.lastPhoto = entities.entities[entities.ids[entities.ids.length - 1]];

            return entities;
        }
        case ActionTypes.LOAD_RANDOM_FAILURE: {
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
                currentPhotoRating: action.payload.rating
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
            const entities = photoAdapter.addAll(action.payload.photos, {
                ...state,
                isLoading: false,
                error: null
            });

            entities.firstPhoto = entities.entities[entities.ids[0]],
            entities.lastPhoto = entities.entities[entities.ids[entities.ids.length - 1]];

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
                currentPhoto: action.payload.photo
            };
        }
        case ActionTypes.MOVE_NEXT_REQUEST: {
            return {
                ...state,
                currentPhoto: nextPhoto(state)
            };
        }
        case ActionTypes.MOVE_PREVIOUS_REQUEST: {
            return {
                ...state,
                currentPhoto: previousPhoto(state)
            };
        }
        case ActionTypes.RATE_PHOTO_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null,
                currentPhotoRating: {
                    ...state.currentPhotoRating,
                    userRating: action.payload.userRating
                }
            };
        }
        case ActionTypes.RATE_PHOTO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                currentPhotoRating: {
                    ...state.currentPhotoRating,
                    averageRating: Math.round(action.payload.averageRating)
                }
            };
        }
        case ActionTypes.RATE_PHOTO_FAILURE: {
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
        case ActionTypes.LOAD_EXIF_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_EXIF_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                currentPhotoExifData: action.payload.exif
            };
        }
        case ActionTypes.LOAD_EXIF_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.ROTATE_CLOCKWISE_REQUEST: {
            return state;
        }
        case ActionTypes.ROTATE_COUNTER_CLOCKWISE_REQUEST: {
            return state;
        }
        case ActionTypes.ROTATE_SUCCESS: {
            return {
                ...state,
                currentPhotoEffects: {
                    ...state.currentPhotoEffects,
                    rotation: action.payload.newRotation
                }
            };
        }
        case ActionTypes.RESET_EFFECTS_REQUEST: {
            return {
                ...state,
                currentPhotoEffects: {
                    rotation: new PhotoRotation(),
                    grayscale: 0,
                    sepia: 0,
                    brightness: 100,
                    saturation: 100,
                    contrast: 100,
                    invert: 0,
                    blur: 0,
                    hueRotate: 0
                }
            };
        }
        case ActionTypes.UPDATE_EFFECTS_REQUEST: {
            return {
                ...state,
                currentPhotoEffects: {
                    ...action.payload.effects
                }
            };
        }
        case ActionTypes.TOGGLE_SLIDESHOW_REQUEST: {
            return {
                ...state,
                slideshowIsPlaying: !state.slideshowIsPlaying
            };
        }
        default: {
            return state;
        }
    }
}

function nextPhoto(state: State): Photo {
    return getPhotoAtIndex(state, incrementCurrentIndexWithinBounds(state, 1));
}

function previousPhoto(state: State): Photo {
    return getPhotoAtIndex(state, incrementCurrentIndexWithinBounds(state, -1));
}

function getPhotoAtIndex(state: State, idx: number) {
    // entities are keyed by id
    return state.entities[state.ids[idx]];
}

function incrementCurrentIndexWithinBounds(state: State, direction: number): number {
    const lastIdx = state.ids.length - 1;
    const idx = getCurrentIndex(state) + direction;

    return Math.max(0, Math.min(idx, lastIdx));
}

function getCurrentIndex(state: State): number {
    return (<number[]> state.ids).findIndex(id => id === state.currentPhoto.id);
}
