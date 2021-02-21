import { createSelector } from '@ngrx/store';

import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from '@models';
import { AuthStoreSelectors } from './auth-store';
import { RouterStoreSelectors } from './router-store';

export const error = createSelector(
    PhotoCategoryStoreSelectors.error,
    VideoCategoryStoreSelectors.videoCategoryError,
    (photoCategoryError: string | null, videoCategoryError: string | null) => {
        return photoCategoryError || videoCategoryError;
    }
);

export const isLoading = createSelector(
    PhotoCategoryStoreSelectors.isLoading,
    VideoCategoryStoreSelectors.videoCategoryIsLoading,
    (photoCategoryIsLoading: boolean, videoCategoryIsLoading: boolean) => {
        return photoCategoryIsLoading || videoCategoryIsLoading;
    }
);

export const enableBulkEdit = createSelector(
    AuthStoreSelectors.isAdmin,
    RouterStoreSelectors.inRandomArea,
    (isAdmin, isRandomView) => isAdmin && !isRandomView
);

export const allCategories = createSelector(
    PhotoCategoryStoreSelectors.allCategories,
    VideoCategoryStoreSelectors.allCategories,
    (photoCategories: Category[], videoCategories: Category[]) => {
        if (photoCategories.length > 0 && videoCategories.length > 0) {
            return [...photoCategories, ...videoCategories].sort(
                categoriesDescending
            );
        }

        return [];
    }
);

export const allYears = createSelector(
    PhotoCategoryStoreSelectors.allYears,
    VideoCategoryStoreSelectors.allYears,
    (photoYears: number[], videoYears: number[]) => {
        if (photoYears.length > 0 && videoYears.length > 0) {
            return Array.from(
                new Set([...(photoYears ?? []), ...(videoYears ?? [])])
            ).sort(sortNumbersDescending);
        }

        return [];
    }
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
