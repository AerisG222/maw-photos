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
            return photoCategoryAdapter.addMany(action.payload.categories, {
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
        case ActionTypes.SET_CURRENT_BY_ID: {
            return {
                ...state,
                currentCategory: state.entities[action.payload.categoryId]
            };
        }
        default: {
            return state;
        }
    }
}
