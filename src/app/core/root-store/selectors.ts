import { createSelector, MemoizedSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    SettingsStoreSelectors.selectSettingsError,
    PhotoCategoryStoreSelectors.selectPhotoCategoryError,
    (settingsError: string, photoCategoryError: string) => {
        return settingsError || photoCategoryError;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    SettingsStoreSelectors.selectSettingsIsLoading,
    PhotoCategoryStoreSelectors.selectPhotoCategoryIsLoading,
    (settingsIsLoading: boolean, photoCategoryIsLoading: boolean) => {
        return settingsIsLoading || photoCategoryIsLoading;
    }
);
