import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, searchAdapter } from './state';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';
import { SearchResult } from 'src/app/search/models/search-result.model';

const getError = (state: State): string | undefined => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getQuery = (state: State): string | undefined => state.query;
const getCurrentResult = (state: State): SearchResult<MultimediaCategory> | undefined => state.currentResult;
const getCurrentStartIndex = (state: State): number => !!state.currentResult ? state.currentResult.startIndex : -1;
const hasMoreResults = (state: State): boolean => {
    if (!!state.currentResult) {
        const result = state.currentResult;

        return (result.startIndex + result.results.length) < result.totalFound;
    }

    return false;
};

export const selectSearchState = createFeatureSelector<State>(SEARCH_FEATURE_NAME);

export const selectSearchError = createSelector(selectSearchState, getError);
export const selectSearchIsLoading = createSelector(selectSearchState, getIsLoading);
export const selectSearchQuery = createSelector(selectSearchState, getQuery);
export const selectSearchCurrentStartIndex = createSelector(selectSearchState, getCurrentStartIndex);
export const selectSearchCurrentResult = createSelector(selectSearchState, getCurrentResult);
export const selectSearchHasMoreResults = createSelector(selectSearchState, hasMoreResults);

export const selectSearchAllResults = searchAdapter.getSelectors(selectSearchState).selectAll;
