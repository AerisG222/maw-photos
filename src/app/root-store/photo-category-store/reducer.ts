import { Actions, ActionTypes } from './actions';
import { photoCategoryAdapter, initialState, State } from './state';

export function photoCategoryReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOAD_REQUEST: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.LOAD_SUCCESS: {
            return photoCategoryAdapter.addAll(action.payload.categories, {
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
        default: {
            return state;
        }
    }
}
