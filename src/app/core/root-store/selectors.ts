import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from 'src/app/models/category.model';
import { CategoryFilter } from 'src/app/models/category-filter.model';

export const selectError = createSelector(
    SettingsStoreSelectors.selectSettingsError,
    PhotoCategoryStoreSelectors.selectPhotoCategoryError,
    VideoCategoryStoreSelectors.selectVideoCategoryError,
    (settingsError: string, photoCategoryError: string, videoCategoryError: string) => {
        return settingsError || photoCategoryError || videoCategoryError;
    }
);

export const selectIsLoading = createSelector(
    SettingsStoreSelectors.selectSettingsIsLoading,
    PhotoCategoryStoreSelectors.selectPhotoCategoryIsLoading,
    VideoCategoryStoreSelectors.selectVideoCategoryIsLoading,
    (
        settingsIsLoading: boolean,
        photoCategoryIsLoading: boolean,
        videoCategoryIsLoading: boolean
    ) =>
        settingsIsLoading ||
        photoCategoryIsLoading ||
        videoCategoryIsLoading
);

export const selectAllCategories = createSelector(
    PhotoCategoryStoreSelectors.selectAllCategories,
    VideoCategoryStoreSelectors.selectAllCategories,
    (photoCategories: Category[], videoCategories: Category[]) => {
        if (photoCategories.length > 0 && videoCategories.length > 0) {
            return [...photoCategories, ...videoCategories].sort(categoriesDescending);
        }

        return [];
    }
);

export const selectAllYears = createSelector(
    PhotoCategoryStoreSelectors.selectAllYears,
    VideoCategoryStoreSelectors.selectAllYears,
    (photoYears: number[], videoYears: number[]) => Array
        .from(new Set([...photoYears, ...videoYears]))
        .sort(sortNumbersDescending)
);

export const selectAllFilteredCategoryYears = createSelector(
    selectAllYears,
    PhotoCategoryStoreSelectors.selectAllYears,
    VideoCategoryStoreSelectors.selectAllYears,
    SettingsStoreSelectors.selectCategoryListYearFilter,
    SettingsStoreSelectors.selectCategoryListCategoryFilter,
    (allYears, photoYears, videoYears, yearFilter, typeFilter) => {
        if (yearFilter === 'all') {
            switch (typeFilter) {
                case CategoryFilter.all:
                    return allYears;
                case CategoryFilter.photos:
                    return photoYears;
                case CategoryFilter.videos:
                    return videoYears;
            }
        }

        return [yearFilter as number];
    }
);

export const selectAllFilteredCategoriesForYear = createSelector(
    PhotoCategoryStoreSelectors.selectCategoriesForYear,
    VideoCategoryStoreSelectors.selectCategoriesForYear,
    SettingsStoreSelectors.selectCategoryListCategoryFilter,
    (photoCategories: Category[], videoCategories: Category[], filter: CategoryFilter, props: { year: number }) => {
        switch (filter) {
            case CategoryFilter.all:
                return [...photoCategories, ...videoCategories];
            case CategoryFilter.photos:
                return photoCategories;
            case CategoryFilter.videos:
                return videoCategories;
        }

        return [];
});

export const selectInitialYearFilterSelection = createSelector(
    selectAllYears,
    SettingsStoreSelectors.selectCategoryListYearFilter,
    (years, filter) => !!filter ? filter : years[0]
);

function sortNumbersDescending(first: number, second: number): number {
    return second - first;
}

function categoriesDescending(first: Category, second: Category): number {
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
}
