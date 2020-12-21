import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, searchAdapter } from './state';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';
import { SearchResult } from 'src/app/search/models/search-result.model';

export const searchState = createFeatureSelector<State>(SEARCH_FEATURE_NAME);

const { selectAll } = searchAdapter.getSelectors(searchState);

export const selectSearchAllResults = selectAll;

export const selectSearchError = createSelector(
    searchState,
    (state: State): string | null => state.error
);

export const selectSearchIsLoading = createSelector(
    searchState,
    (state: State): boolean => state.isLoading
);

export const selectSearchQuery = createSelector(
    searchState,
    (state: State): string | null => state.query
);

export const selectSearchCurrentStartIndex = createSelector(
    searchState,
    (state: State): number => !!state.currentResult ? state.currentResult.startIndex : -1
);

export const selectSearchCurrentResult = createSelector(
    searchState,
    (state: State): SearchResult<MultimediaCategory> | null => state.currentResult
);

export const selectSearchHasMoreResults = createSelector(
    selectSearchCurrentResult,
    (result): boolean => {
        return !!result ? (result.startIndex + result.results.length) < result.totalFound : false;
    }
);
