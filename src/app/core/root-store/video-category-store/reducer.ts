import { Actions, ActionTypes } from './actions';
import { VideoCategoryAdapter, initialState, State } from './state';

export function videoCategoryReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_SUCCESS: {
            return VideoCategoryAdapter.addMany(action.payload.categories, {
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
                currentCategory: action.payload.category
            };
        }
        default: {
            return state;
        }
    }
}
