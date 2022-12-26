import { createSelector } from '@ngrx/store';

import {
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreSelectors,
    SettingsStoreSelectors,
    RouterStoreSelectors,
    RootStoreSelectors,
} from '@core/root-store';
import { Category, CategoryTypeFilter } from '@models';
import { CategoriesUrlService } from '../services/categories-url.service';

export const selectCategoryEffectiveYearFilter = createSelector(
    RootStoreSelectors.selectAllYears,
    SettingsStoreSelectors.selectCategoryFilterSettings,
    RouterStoreSelectors.selectRouteDetails,
    (years, filterSettings, routeDetails) => {
        return CategoriesUrlService.getValidYearFilter(
            routeDetails?.queryParams?.year as string,
            filterSettings.yearFilter,
            years
        );
    }
);

export const selectCategoryEffectiveTypeFilter = createSelector(
    SettingsStoreSelectors.selectCategoryFilterSettings,
    RouterStoreSelectors.selectRouteDetails,
    (filterSettings, routeDetails) => {
        return CategoriesUrlService.getValidTypeFilter(
            routeDetails?.queryParams?.type as string,
            filterSettings.typeFilter
        );
    }
);

export const selectAllFilteredCategoryYears = createSelector(
    RootStoreSelectors.selectAllYears,
    PhotoCategoryStoreSelectors.selectAllYears,
    VideoCategoryStoreSelectors.selectAllYears,
    selectCategoryEffectiveYearFilter,
    selectCategoryEffectiveTypeFilter,
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

export const selectAllFilteredCategoriesForYear = createSelector(
    PhotoCategoryStoreSelectors.selectCategoriesForYear,
    VideoCategoryStoreSelectors.selectCategoriesForYear,
    selectCategoryEffectiveTypeFilter,
    SettingsStoreSelectors.selectCategoryFilterSettings,
    (photoCategories, videoCategories, typeFilter, filterSettings) => {
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

        if (filterSettings.missingGpsFilter) {
            return categories.filter((c) => c.actual.isMissingGpsData);
        }

        return categories;
    }
);
