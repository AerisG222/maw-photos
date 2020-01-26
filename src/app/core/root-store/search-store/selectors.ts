import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, searchAdapter } from './state';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { MultimediaCategory } from '../../models/search/multimedia-category.model';
import { SearchResult } from '../../models/search/search-result.model';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getQuery = (state: State): string => state.query;
const getCurrentResult = (state: State): SearchResult<MultimediaCategory> => state.currentResult;

export const selectSearchState = createFeatureSelector<State>(SEARCH_FEATURE_NAME);

export const selectSearchError = createSelector(selectSearchState, getError);
export const selectSearchIsLoading = createSelector(selectSearchState, getIsLoading);
export const selectQuery = createSelector(selectSearchState, getQuery);
export const selectCurrentResult = createSelector(selectSearchState, getCurrentResult);

export const selectAllResults = searchAdapter.getSelectors(selectSearchState).selectAll;
