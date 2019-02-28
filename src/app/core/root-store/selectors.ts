import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from '../models/category.model';
import { PhotoCategory } from '../models/photo-category.model';
import { VideoCategory } from '../models/video-category.model';
import { CategoryType } from '../models/category-type.model';

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
        return Array
            .from(new Set([...photoYears, ...videoYears]))
            .sort(sortNumbersDescending);
    }
);

export const selectCombinedCategories = createSelector(
    PhotoCategoryStoreSelectors.selectAllCategories,
    VideoCategoryStoreSelectors.selectAllCategories,
    (photoCategories: PhotoCategory[], videoCategories: VideoCategory[]) => {
        return combine(photoCategories, videoCategories);
    }
);


export const selectCombinedCategoriesForYear = createSelector(
    PhotoCategoryStoreSelectors.selectAllCategories,
    VideoCategoryStoreSelectors.selectAllCategories,
    (photoCategories: PhotoCategory[], videoCategories: VideoCategory[], props: { year: number }) => {
        return combine(
            photoCategories.filter(p => p.year === props.year),
            videoCategories.filter(p => p.year === props.year)
        );
    }
);

function combine(photoCategories: PhotoCategory[], videoCategories: VideoCategory[]): Category[] {
    const pcats: Category[] = photoCategories.map(c => ({
        type: CategoryType.photo,
        categoryRoute: 'photos',
        id: c.id,
        name: c.name,
        year: c.year,
        createDate: c.createDate,
        teaserImage: c.teaserImage,
        teaserImageSq: c.teaserImageSq,
        actual: c
    }));

    const vcats: Category[] = videoCategories.map(c => ({
        type: CategoryType.video,
        categoryRoute: 'videos',
        id: c.id,
        name: c.name,
        year: c.year,
        createDate: c.createDate,
        teaserImage: c.teaserImage,
        teaserImageSq: c.teaserImageSq,
        actual: c
    }));

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
