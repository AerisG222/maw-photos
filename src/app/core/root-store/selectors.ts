import { createSelector } from '@ngrx/store';

import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from '@models';
import { AuthStoreSelectors } from './auth-store';
import { RouterStoreSelectors } from './router-store';

export const selectError = createSelector(
    PhotoCategoryStoreSelectors.selectError,
    VideoCategoryStoreSelectors.selectVideoCategoryError,
    (photoCategoryError: string | null, videoCategoryError: string | null) => {
        return photoCategoryError || videoCategoryError;
    }
);

export const selectAreCategoriesLoading = createSelector(
    PhotoCategoryStoreSelectors.selectIsLoading,
    VideoCategoryStoreSelectors.selectVideoCategoryIsLoading,
    (photoCategoryIsLoading: boolean, videoCategoryIsLoading: boolean) => {
        return photoCategoryIsLoading || videoCategoryIsLoading;
    }
);

export const selectEnableBulkEdit = createSelector(
    AuthStoreSelectors.selectIsAdmin,
    RouterStoreSelectors.selectInRandomArea,
    (isAdmin, isRandomView) => isAdmin && !isRandomView
);

export const selectAllCategories = createSelector(
    PhotoCategoryStoreSelectors.allCategories,
    VideoCategoryStoreSelectors.allCategories,
    (photoCategories: Category[], videoCategories: Category[]) => {
        return [...photoCategories, ...videoCategories].sort(
            categoriesDescending
        );
    }
);

export const selectAllYears = createSelector(
    selectAreCategoriesLoading,
    PhotoCategoryStoreSelectors.selectAllYears,
    VideoCategoryStoreSelectors.selectAllYears,
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
