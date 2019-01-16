import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';
import { Action } from 'rxjs/internal/scheduler/Action';

export function featureReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        case ActionTypes.LOAD_SUCCESS:
            return {
                ...state,
                settings: action.payload.settings,
                error: null,
                isLoading: false
            };
        case ActionTypes.LOAD_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            };
        case ActionTypes.SAVE_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: false
            };
        case ActionTypes.SAVE_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case ActionTypes.SAVE_SUCCESS:
            return {
                ...state,
                settings: action.payload.settings,
                error: null,
                isLoading: false
            };
        default: {
            return state;
        }
    }
}
