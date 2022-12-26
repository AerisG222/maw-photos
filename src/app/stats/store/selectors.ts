import { createSelector } from '@ngrx/store';

import {
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreSelectors,
    RouterStoreSelectors,
    RootStoreSelectors,
} from '@core/root-store';
import { calculateStats } from '@models';

export const selectPhotoStats = createSelector(
    PhotoCategoryStoreSelectors.selectAllYears,
    PhotoCategoryStoreSelectors.allCategories,
    (years, categories) => calculateStats(years, categories)
);

export const selectVideoStats = createSelector(
    VideoCategoryStoreSelectors.selectAllYears,
    VideoCategoryStoreSelectors.allCategories,
    (years, categories) => calculateStats(years, categories)
);

export const selectCombinedStats = createSelector(
    RootStoreSelectors.selectAllYears,
    RootStoreSelectors.selectAllCategories,
    (years, categories) => calculateStats(years, categories)
);

export const selectEffectiveYear = createSelector(
    RouterStoreSelectors.selectRouteDetails,
    ({ params }) => {
        const year = Number(params.year);

        return isNaN(year) ? -1 : year;
    }
);

export const selectAggregateBy = createSelector(
    RouterStoreSelectors.selectRouteDetails,
    ({ queryParams }) => {
        const agg = queryParams?.agg as string;

        return !agg ? 'count' : agg;
    }
);
