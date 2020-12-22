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
    (settingsError: string | null, photoCategoryError: string | null, videoCategoryError: string | null) => {
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
    (photoYears: number[] | null, videoYears: number[] | null) => Array
        .from(new Set([...(photoYears ?? []), ...(videoYears ?? [])]))
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
    SettingsStoreSelectors.selectCategoryListMissingGpsFilter,
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

export const selectInitialYearFilterSelection = createSelector(
    selectAllYears,
    SettingsStoreSelectors.selectCategoryListYearFilter,
    (years, filter) => !!filter ? filter : years[0]
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
