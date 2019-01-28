import { Actions, ActionTypes } from './actions';
import { photoAdapter, initialState, State } from './state';

export function photoReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.CLEAR_REQUEST: {
            return photoAdapter.removeAll({
                ...state
            });
        }
        case ActionTypes.LOAD_RANDOM_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_RANDOM_SUCCESS: {
            return photoAdapter.addOne(action.payload.photo, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.LOAD_RANDOM_FAILURE: {
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
            return photoAdapter.addAll(action.payload.photos, {
                ...state,
                isLoading: false,
                error: null
            });
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
        default: {
            return state;
        }
    }
}
