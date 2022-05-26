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

export const areCategoriesLoading = createSelector(
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
        return [...photoCategories, ...videoCategories].sort(
            categoriesDescending
        );
    }
);

export const allYears = createSelector(
    areCategoriesLoading,
    PhotoCategoryStoreSelectors.allYears,
    VideoCategoryStoreSelectors.allYears,
    (areCategoriesLoading: boolean, photoYears: number[], videoYears: number[]) => {
        return areCategoriesLoading ?
            [] :
            Array.from(
                new Set([...(photoYears ?? []), ...(videoYears ?? [])])
            ).sort(sortNumbersDescending);
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
