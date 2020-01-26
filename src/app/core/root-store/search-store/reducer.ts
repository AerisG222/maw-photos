import { createReducer, on, Action } from '@ngrx/store';

import { initialState, State, searchAdapter } from './state';
import * as SearchActions from './actions';

const reducer = createReducer(
    initialState,
    on(SearchActions.clearRequest, state => (
        searchAdapter.removeAll({
            ...state,
            query: null,
            currentResult: null
        })
    )),
    on(SearchActions.queryRequest, (state, { query }) => ({
        ...state,
        isLoading: true,
        error: null,
        query
    })),
    on(SearchActions.querySuccess, (state, { result }) =>
        searchAdapter.addAll(result.results, {
            ...state,
            isLoading: false,
            error: null,
            currentResult: result
        })
    ),
    on(SearchActions.queryFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(SearchActions.queryNextPageRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(SearchActions.queryNextPageSuccess, (state, { result }) =>
        searchAdapter.addMany(result.results, {
            ...state,
            isLoading: false,
            error: null,
            currentResult: result
        })
    ),
    on(SearchActions.queryNextPageFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);

export function searchReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}
