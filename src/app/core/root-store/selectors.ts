import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from '../models/category.model';
import { PhotoCategory } from '../models/photo-category.model';
import { VideoCategory } from '../models/video-category.model';
import { photoCategoryToCategory, videoCategoryToCategory } from '../models/category-map-functions';
import { CategoryFilter } from '../models/category-filter.model';
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

export const selectAllCategories = createSelector(
    PhotoCategoryStoreSelectors.selectAllCategories,
    VideoCategoryStoreSelectors.selectAllCategories,
    (photoCategories: PhotoCategory[], videoCategories: VideoCategory[]) => {
        if (photoCategories.length > 0 && videoCategories.length > 0) {
            return combine(photoCategories, videoCategories);
        }

        return [];
    }
);

export const selectAllYears = createSelector(
    selectAllCategories,
    (categories: Category[]) => Array
        .from(new Set([...categories.map(c => c.year)]))
        .sort(sortNumbersDescending)
);

export const selectAllCategoriesForYear = createSelector(
    selectAllCategories,
    (categories: Category[], props: { year: number }) => categories
        .filter(c => c.year === props.year)
);

export const selectAllFilteredCategories = createSelector(
    selectAllCategories,
    SettingsStoreSelectors.selectCategoryListCategoryFilter,
    (allCategories, categoryTypeFilter) => {
        let cats: Category[];

        switch (categoryTypeFilter) {
            case null:
            case CategoryFilter.all:
                cats = allCategories;
                break;
            case CategoryFilter.photos:
                cats = allCategories.filter(c => c.type === CategoryType.photo);
                break;
            case CategoryFilter.videos:
                cats = allCategories.filter(c => c.type === CategoryType.video);
                break;
            default:
                throw new Error('Unknown Filter Type!');
        }

        return cats.sort(categoriesDescending);
    }
);

export const selectAllFilteredCategoryYears = createSelector(
    selectAllFilteredCategories,
    SettingsStoreSelectors.selectCategoryListYearFilter,
    (cats, yearFilter) => {
        if (yearFilter !== 'all') {
            const result = [];
            result.push(yearFilter);

            return result;
        }

        return Array.from(
            new Set(
                cats.map(c => c.year)
            )
        );
    }
);

export const selectAllFilteredCategoriesForYear = createSelector(
    selectAllFilteredCategories,
    (categories, props: { year: number }) => categories.filter(c => c.year === props.year)
);

export const selectInitialYearFilterSelection = createSelector(
    selectAllYears,
    SettingsStoreSelectors.selectCategoryListYearFilter,
    (years, filter) => !!filter ? filter : years[0]
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
