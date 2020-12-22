import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, searchAdapter } from './state';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';
import { SearchResult } from 'src/app/search/models/search-result.model';

const searchState = createFeatureSelector<State>(SEARCH_FEATURE_NAME);

const { selectAll } = searchAdapter.getSelectors(searchState);

export const allResults = selectAll;

export const error = createSelector(
    searchState,
    (state: State): string | null => state.error
);

export const isLoading = createSelector(
    searchState,
    (state: State): boolean => state.isLoading
);

export const query = createSelector(
    searchState,
    (state: State): string | null => state.query
);

export const activeResultStartIndex = createSelector(
    searchState,
    (state: State): number => !!state.activeResult ? state.activeResult.startIndex : -1
);

export const activeResult = createSelector(
    searchState,
    (state: State): SearchResult<MultimediaCategory> | null => state.activeResult
);

export const hasMoreResults = createSelector(
    activeResult,
    (result): boolean => {
        return !!result ? (result.startIndex + result.results.length) < result.totalFound : false;
    }
);
