import { createSelector } from '@ngrx/store';

import {
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreSelectors,
    RouterStoreSelectors,
    RootStoreSelectors,
} from '@core/root-store';
import { calculateStats } from '@models';

export const photoStats = createSelector(
    PhotoCategoryStoreSelectors.allYears,
    PhotoCategoryStoreSelectors.allCategories,
    (years, categories) => calculateStats(years, categories)
);

export const videoStats = createSelector(
    VideoCategoryStoreSelectors.allYears,
    VideoCategoryStoreSelectors.allCategories,
    (years, categories) => calculateStats(years, categories)
);

export const combinedStats = createSelector(
    RootStoreSelectors.allYears,
    RootStoreSelectors.allCategories,
    (years, categories) => calculateStats(years, categories)
);

export const effectiveYear = createSelector(
    RouterStoreSelectors.selectRouteDetails,
    ({ params }) => {
        const year = Number(params.year);

        return isNaN(year) ? -1 : year;
    }
);

export const aggregateBy = createSelector(
    RouterStoreSelectors.selectRouteDetails,
    ({ queryParams }) => {
        const agg = queryParams?.agg as string;

        return !agg ? 'count' : agg;
    }
);
