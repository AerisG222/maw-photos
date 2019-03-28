import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from '../models/category.model';
import { PhotoCategory } from '../models/photo-category.model';
import { VideoCategory } from '../models/video-category.model';
import { CategoryType } from '../models/category-type.model';
import { photoCategoryToCategory, videoCategoryToCategory } from '../models/category-map-functions';

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
    (settingsIsLoading: boolean, photoCategoryIsLoading: boolean, videoCategoryIsLoading: boolean) => {
        return settingsIsLoading || photoCategoryIsLoading || videoCategoryIsLoading;
    }
);

export const selectCombinedYears = createSelector(
    PhotoCategoryStoreSelectors.selectAllYears,
    VideoCategoryStoreSelectors.selectAllYears,
    (photoYears: number[], videoYears: number[]) => {
        if (photoYears.length > 0 && videoYears.length > 0) {
            return Array
                .from(new Set([...photoYears, ...videoYears]))
                .sort(sortNumbersDescending);
        }

        return [];
    }
);

export const selectCombinedCategories = createSelector(
    PhotoCategoryStoreSelectors.selectAllCategories,
    VideoCategoryStoreSelectors.selectAllCategories,
    (photoCategories: PhotoCategory[], videoCategories: VideoCategory[]) => {
        if (photoCategories.length > 0 && videoCategories.length > 0) {
            return combine(photoCategories, videoCategories);
        }

        return [];
    }
);

export const selectCombinedCategoriesForYear = createSelector(
    PhotoCategoryStoreSelectors.selectAllCategories,
    VideoCategoryStoreSelectors.selectAllCategories,
    (photoCategories: PhotoCategory[], videoCategories: VideoCategory[], props: { year: number }) => {
        if (photoCategories.length > 0 && videoCategories.length > 0) {
            return combine(
                photoCategories.filter(p => p.year === props.year),
                videoCategories.filter(p => p.year === props.year)
            );
        }

        return [];
    }
);

function combine(photoCategories: PhotoCategory[], videoCategories: VideoCategory[]): Category[] {
    const pcats: Category[] = photoCategories.map(c => photoCategoryToCategory(c));
    const vcats: Category[] = videoCategories.map(c => videoCategoryToCategory(c));

    return [...pcats, ...vcats].sort(categoriesDescending);
}

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
