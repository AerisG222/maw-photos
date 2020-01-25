import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { State } from './state';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { MultimediaCategory } from '../../models/search/multimedia-category.model';
import { SearchResult } from '../../models/search/search-result.model';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSearchResult = (state: State): SearchResult<MultimediaCategory> => state.searchResult;

export const selectSearchState = createFeatureSelector<State>(SEARCH_FEATURE_NAME);

export const selectSearcError = createSelector(selectSearchState, getError);
export const selectSearchIsLoading = createSelector(selectSearchState, getIsLoading);
export const selectSearchResult = createSelector(selectSearchState, getSearchResult);
