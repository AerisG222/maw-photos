import { createReducer, on } from '@ngrx/store';

import { initialState, searchAdapter, State } from './state';
import * as SearchActions from './actions';

export const reducer = createReducer(
    initialState,
    on(
        SearchActions.clearRequest,
        (state): State =>
            searchAdapter.removeAll({
                ...state,
                query: null,
                activeResult: null,
            })
    ),
    on(
        SearchActions.queryRequest,
        (state): State => ({
            ...state,
            isLoading: true,
            error: null,
        })
    ),
    on(
        SearchActions.querySuccess,
        (state, { query, result }): State =>
            searchAdapter.setAll(result.results, {
                ...state,
                isLoading: false,
                error: null,
                activeResult: result,
                query,
            })
    ),
    on(
        SearchActions.queryFailure,
        (state, { error }): State => ({
            ...state,
            isLoading: false,
            error,
        })
    ),
    on(
        SearchActions.queryMoreRequest,
        (state): State => ({
            ...state,
            isLoading: true,
            error: null,
        })
    ),
    on(
        SearchActions.queryMoreSuccess,
        (state, { query, result }): State =>
            searchAdapter.addMany(result.results, {
                ...state,
                isLoading: false,
                error: null,
                activeResult: result,
                query,
            })
    ),
    on(
        SearchActions.queryMoreFailure,
        (state, { error }): State => ({
            ...state,
            isLoading: false,
            error,
        })
    ),
    on(
        SearchActions.exitSearchArea,
        (): State =>
            searchAdapter.removeAll({
                ...initialState,
            })
    )
);
