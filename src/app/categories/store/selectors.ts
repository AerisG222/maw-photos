import { createSelector } from '@ngrx/store';

import {
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreSelectors,
    SettingsStoreSelectors,
    RouterStoreSelectors,
    RootStoreSelectors
} from '@core/root-store';
import { Category, CategoryTypeFilter } from '@models';
import { CategoriesUrlService } from '../services/categories-url.service';

export const categoryEffectiveYearFilter = createSelector(
    RootStoreSelectors.allYears,
    SettingsStoreSelectors.categoryListYearFilter,
    RouterStoreSelectors.selectRouteDetails,
    (years, yearFilter, routeDetails) => {
        return CategoriesUrlService.getValidYearFilter(routeDetails?.queryParams?.year as string, yearFilter, years);
    }
);

export const categoryEffectiveTypeFilter = createSelector(
    SettingsStoreSelectors.categoryListCategoryFilter,
    RouterStoreSelectors.selectRouteDetails,
    (typeFilter, routeDetails) => {
        return CategoriesUrlService.getValidTypeFilter(routeDetails?.queryParams?.type as string, typeFilter);
    }
);

export const allFilteredCategoryYears = createSelector(
    RootStoreSelectors.allYears,
    PhotoCategoryStoreSelectors.allYears,
    VideoCategoryStoreSelectors.allYears,
    categoryEffectiveYearFilter,
    categoryEffectiveTypeFilter,
    (years, photoYears, videoYears, yearFilter, typeFilter) => {
        if (yearFilter === 'all') {
            switch (typeFilter) {
                case CategoryTypeFilter.all:
                    return years ?? [];
                case CategoryTypeFilter.photos:
                    return photoYears ?? [];
                case CategoryTypeFilter.videos:
                    return videoYears ?? [];
                default:
                    // return all for bogus url
                    return years ?? [];
            }
        }

        return [yearFilter as number];
    }
);

export const allFilteredCategoriesForYear = createSelector(
    PhotoCategoryStoreSelectors.categoriesForYear,
    VideoCategoryStoreSelectors.categoriesForYear,
    categoryEffectiveTypeFilter,
    SettingsStoreSelectors.categoryListMissingGpsFilter,
    // eslint-disable-next-line max-len
    (photoCategories, videoCategories, typeFilter, missingGpsFilter, props: { year: number }) => {
        let categories: Category[] = [];
        switch (typeFilter) {
            case CategoryTypeFilter.all:
                categories = [...photoCategories, ...videoCategories];
                break;
            case CategoryTypeFilter.photos:
                categories = photoCategories;
                break;
            case CategoryTypeFilter.videos:
                categories = videoCategories;
                break;
            default:
                categories = [...photoCategories, ...videoCategories];
        }

        if (missingGpsFilter) {
            return categories.filter(c => c.actual.isMissingGpsData);
        }

        return categories;
});
