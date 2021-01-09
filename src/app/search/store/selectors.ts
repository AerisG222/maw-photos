import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, searchAdapter } from './state';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';
import { SearchResult } from 'src/app/search/models/search-result.model';
import { CategoryType, CategoryTeaser } from '@models';

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

export const totalResults = createSelector(
    activeResult,
    result => result?.totalFound ?? 0
);

export const showTotalResults = createSelector(
    totalResults,
    total => total > 0
);

export const allResultsAsCategories = createSelector(
    allResults,
    cats => cats.map(adaptSearchResultToCategory)
);

export const shownResults = createSelector(
    activeResult,
    result => (!!result) ? result.startIndex + result.results.length : 0
);

export const showNoResults = createSelector(
    activeResult,
    result => (!!result) ? result.totalFound === 0 : false
);

export const nextResultIndex = createSelector(
    activeResult,
    result => !!result ? result.startIndex + result.results.length : -1
);

const adaptSearchResultToCategory = (cat: MultimediaCategory): CategoryTeaser => ({
    route: `/${ cat.multimediaType }s`,
    id: cat.id,
    year: cat.year,
    name: cat.name,
    teaserImage: {
        height: cat.teaserPhotoHeight,
        width: cat.teaserPhotoWidth,
        url: cat.teaserPhotoPath,
        size: 0
    },
    teaserImageSq: {
        height: cat.teaserPhotoSqHeight,
        width: cat.teaserPhotoSqWidth,
        url: cat.teaserPhotoSqPath,
        size: 0
    },
    type: cat.multimediaType === 'photo' ? CategoryType.photo : CategoryType.video
});
