import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category, CategoryFilter } from '@models';
import { AuthStoreSelectors } from './auth-store';
import { RouterStoreSelectors } from './router-store';

export const error = createSelector(
    SettingsStoreSelectors.error,
    PhotoCategoryStoreSelectors.error,
    VideoCategoryStoreSelectors.videoCategoryError,
    (settingsError: string | null, photoCategoryError: string | null, videoCategoryError: string | null) => {
        return settingsError || photoCategoryError || videoCategoryError;
    }
);

export const isLoading = createSelector(
    SettingsStoreSelectors.isLoading,
    PhotoCategoryStoreSelectors.isLoading,
    VideoCategoryStoreSelectors.videoCategoryIsLoading,
    (settingsIsLoading: boolean, photoCategoryIsLoading: boolean, videoCategoryIsLoading: boolean) => {
        return settingsIsLoading ||
            photoCategoryIsLoading ||
            videoCategoryIsLoading;
    }
);

export const allCategories = createSelector(
    PhotoCategoryStoreSelectors.allCategories,
    VideoCategoryStoreSelectors.allCategories,
    (photoCategories: Category[], videoCategories: Category[]) => {
        if (photoCategories.length > 0 && videoCategories.length > 0) {
            return [...photoCategories, ...videoCategories].sort(categoriesDescending);
        }

        return [];
    }
);

export const allYears = createSelector(
    PhotoCategoryStoreSelectors.allYears,
    VideoCategoryStoreSelectors.allYears,
    (photoYears: number[] | null, videoYears: number[] | null) => Array
        .from(new Set([...(photoYears ?? []), ...(videoYears ?? [])]))
        .sort(sortNumbersDescending)
);

export const allFilteredCategoryYears = createSelector(
    allYears,
    PhotoCategoryStoreSelectors.allYears,
    VideoCategoryStoreSelectors.allYears,
    SettingsStoreSelectors.categoryListYearFilter,
    SettingsStoreSelectors.categoryListCategoryFilter,
    (years, photoYears, videoYears, yearFilter, typeFilter) => {
        if (yearFilter === 'all') {
            switch (typeFilter) {
                case CategoryFilter.all:
                    return years ?? [];
                case CategoryFilter.photos:
                    return photoYears ?? [];
                case CategoryFilter.videos:
                    return videoYears ?? [];
            }
        }

        return [yearFilter as number];
    }
);

export const allFilteredCategoriesForYear = createSelector(
    PhotoCategoryStoreSelectors.categoriesForYear,
    VideoCategoryStoreSelectors.categoriesForYear,
    SettingsStoreSelectors.categoryListCategoryFilter,
    SettingsStoreSelectors.categoryListMissingGpsFilter,
    // eslint-disable-next-line max-len
    (photoCategories: Category[], videoCategories: Category[], filter: CategoryFilter, missingGpsFilter: boolean, props: { year: number }) => {
        let categories: Category[] = [];

        switch (filter) {
            case CategoryFilter.all:
                categories = [...photoCategories, ...videoCategories];
                break;
            case CategoryFilter.photos:
                categories = photoCategories;
                break;
            case CategoryFilter.videos:
                categories = videoCategories;
                break;
        }

        if (missingGpsFilter) {
            return categories.filter(c => c.actual.isMissingGpsData);
        }

        return categories;
});

export const initialYearFilterSelection = createSelector(
    allYears,
    SettingsStoreSelectors.categoryListYearFilter,
    (years, filter) => !!filter ? filter : years[0]
);

export const enableBulkEdit = createSelector(
    AuthStoreSelectors.isAdmin,
    RouterStoreSelectors.isRandomView,
    (isAdmin, isRandomView) => isAdmin && !isRandomView
);

const sortNumbersDescending = (first: number, second: number): number => {
    return second - first;
};

const categoriesDescending = (first: Category, second: Category): number => {
    if (second.createDate && first.createDate) {
        const s = new Date(second.createDate);
        const f = new Date(first.createDate);

        return s.getTime() - f.getTime();
    }

    if (first.name < second.name) {
        return -1;
    }

    if (first.name > second.name) {
        return 1;
    }

    return 0;
};
