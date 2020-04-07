import { createSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';
import { Category } from '../../models/category.model';
import { CategoryFilter } from '../../models/category-filter.model';
import { CategoryType } from '../../models/category-type.model';
import { PhotoStoreSelectors } from './photo-store';
import { VideoStoreSelectors } from './video-store';

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
    PhotoStoreSelectors.selectIsLoading,
    VideoCategoryStoreSelectors.selectVideoCategoryIsLoading,
    VideoStoreSelectors.selectIsLoading,
    (
        settingsIsLoading: boolean,
        photoCategoryIsLoading: boolean,
        photoIsLoading: boolean,
        videoCategoryIsLoading: boolean,
        videoIsLoading: boolean
    ) =>
            settingsIsLoading ||
            photoCategoryIsLoading ||
            photoIsLoading ||
            videoCategoryIsLoading ||
            videoIsLoading
);

export const selectAllCategories = createSelector(
    PhotoCategoryStoreSelectors.selectAllCategoriesAsCategory,
    VideoCategoryStoreSelectors.selectAllCategoriesAsCategory,
    (photoCategories: Category[], videoCategories: Category[]) => {
        if (photoCategories.length > 0 && videoCategories.length > 0) {
            return [...photoCategories, ...videoCategories].sort(categoriesDescending);
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
    (categories: Category[], props: { year: number }) => categories.filter(c => c.year === props.year)
);

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
