import { createReducer, on, Action } from '@ngrx/store';

import { initialState, State } from './state';
import * as SearchActions from './actions';

const reducer = createReducer(
    initialState,
    on(SearchActions.clearRequest, state => ({
        ...state,
        searchResult: null
    })),
    on(SearchActions.queryRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(SearchActions.querySuccess, (state, { result }) => ({
        ...state,
        isLoading: false,
        searchResult: result,
        error: null
    })),
    on(SearchActions.queryFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);

export function searchReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
