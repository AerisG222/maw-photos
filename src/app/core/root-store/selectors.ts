import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from '@models';
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

export const enableBulkEdit = createSelector(
    AuthStoreSelectors.isAdmin,
    RouterStoreSelectors.isRandomView,
    (isAdmin, isRandomView) => isAdmin && !isRandomView
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
