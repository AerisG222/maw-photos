import { createReducer, on } from '@ngrx/store';

import { initialState, searchAdapter } from './state';
import * as SearchActions from './actions';

export const reducer = createReducer(
    initialState,
    on(SearchActions.clearRequest, state => (
        searchAdapter.removeAll({
            ...state,
            query: null,
            currentResult: null
        })
    )),
    on(SearchActions.queryRequest, (state, { query, start }) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(SearchActions.querySuccess, (state, { query, result }) =>
    searchAdapter.setAll(result.results, {
            ...state,
            isLoading: false,
            error: null,
            currentResult: result,
            query
        })
    ),
    on(SearchActions.queryFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(SearchActions.queryMoreRequest, (state, { query, start }) => ({
        ...state,
        isLoading: true,
        error: null,
    })),
    on(SearchActions.queryMoreSuccess, (state, { query, result }) =>
        searchAdapter.addMany(result.results, {
                ...state,
                isLoading: false,
                error: null,
                currentResult: result,
                query
            })
    ),
    on(SearchActions.queryMoreFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);
