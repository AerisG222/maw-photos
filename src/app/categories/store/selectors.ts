import { createSelector } from '@ngrx/store';

import {
    PhotoCategoryStoreSelectors,
    VideoCategoryStoreSelectors,
    SettingsStoreSelectors,
    RouterStoreSelectors,
    RootStoreSelectors
} from '@core/root-store';
import { Category, CategoryTypeFilter } from '@models';

const getValidYearFilter = (filter: string | number, years: number[]): string | number | null => {
    if(filter === 'all') {
        return filter;
    }

    const year = Number(filter);

    if(years.indexOf(year) >= 0) {
        return year;
    }

    return null;
};

const getValidTypeFilter = (filter: string): CategoryTypeFilter | null => {
    if(CategoryTypeFilter.allCategoryFilters.map(f => f.value).indexOf(filter) >= 0) {
        return CategoryTypeFilter.forValue(filter);
    }

    return null;
};

export const categoryEffectiveYearFilter = createSelector(
    RootStoreSelectors.allYears,
    SettingsStoreSelectors.categoryListYearFilter,
    RouterStoreSelectors.selectRouteDetails,
    (years, yearFilter, routeDetails) => {
        const queryYearFilter = getValidYearFilter(routeDetails?.queryParams?.year as string, years);

        if(!!queryYearFilter) {
            return queryYearFilter;
        }

        const settingsYearFilter = getValidYearFilter(yearFilter, years);

        return !!settingsYearFilter ? settingsYearFilter : years[0];
    }
);

export const categoryEffectiveTypeFilter = createSelector(
    SettingsStoreSelectors.categoryListCategoryFilter,
    RouterStoreSelectors.selectRouteDetails,
    (typeFilter, routeDetails) => {
        const queryFilter = getValidTypeFilter(routeDetails?.queryParams?.type as string);

        return queryFilter ?? typeFilter;
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
