import { createSelector, MemoizedSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoriesStoreSelectors } from './photo-category-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    SettingsStoreSelectors.selectSettingsError,
    PhotoCategoriesStoreSelectors.selectCategoryError,
    (settingsError: string, photoCategoryError: string) => {
        return settingsError || photoCategoryError;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    SettingsStoreSelectors.selectSettingsIsLoading,
    PhotoCategoriesStoreSelectors.selectCategoryError,
    (settingsIsLoading: boolean, photoCategoriesAreLoading: boolean) => {
        return settingsIsLoading || photoCategoriesAreLoading;
    }
);
