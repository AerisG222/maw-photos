import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, searchAdapter } from './state';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { MultimediaCategory, SearchResult } from '../models';
import { CategoryType, CategoryTeaser, RouteHelper } from '@models';

const searchState = createFeatureSelector<State>(SEARCH_FEATURE_NAME);

const { selectAll } = searchAdapter.getSelectors(searchState);

export const allResults = selectAll;

export const selectError = createSelector(
    searchState,
    (state: State): string | null => state.error
);

export const selectIsLoading = createSelector(
    searchState,
    (state: State): boolean => state.isLoading
);

export const selectQuery = createSelector(
    searchState,
    (state: State): string | null => state.query
);

export const selectActiveResultStartIndex = createSelector(
    searchState,
    (state: State): number =>
        state.activeResult ? state.activeResult.startIndex : -1
);

export const selectActiveResult = createSelector(
    searchState,
    (state: State): SearchResult<MultimediaCategory> | null =>
        state.activeResult
);

export const selectHasMoreResults = createSelector(
    selectActiveResult,
    (result): boolean => {
        return result
            ? result.startIndex + result.results.length < result.totalFound
            : false;
    }
);

export const selectTotalResults = createSelector(
    selectActiveResult,
    (result) => result?.totalFound ?? 0
);

export const selectShowTotalResults = createSelector(
    selectTotalResults,
    (total) => total > 0
);

export const selectAllResultsAsCategories = createSelector(allResults, (cats) =>
    cats.map(adaptSearchResultToCategory)
);

export const selectShownResults = createSelector(selectActiveResult, (result) =>
    result ? result.startIndex + result.results.length : 0
);

export const selectShowNoResults = createSelector(selectActiveResult, (result) =>
    result ? result.totalFound === 0 : false
);

export const selectNextResultIndex = createSelector(selectActiveResult, (result) =>
    result ? result.startIndex + result.results.length : -1
);

const getUrl = (cat: MultimediaCategory): string => {
    return cat.multimediaType === 'photo'
        ? RouteHelper.photoCategoriesAbs(undefined, cat.id)
        : RouteHelper.videoCategoriesAbs(undefined, cat.id);
};

const adaptSearchResultToCategory = (
    cat: MultimediaCategory
): CategoryTeaser => ({
    route: getUrl(cat),
    id: cat.id,
    year: cat.year,
    name: cat.name,
    teaserImage: {
        height: cat.teaserPhotoHeight,
        width: cat.teaserPhotoWidth,
        url: cat.teaserPhotoPath,
        size: 0,
    },
    teaserImageSq: {
        height: cat.teaserPhotoSqHeight,
        width: cat.teaserPhotoSqWidth,
        url: cat.teaserPhotoSqPath,
        size: 0,
    },
    type:
        cat.multimediaType === 'photo'
            ? CategoryType.photo
            : CategoryType.video,
});
