import { createSelector, MemoizedSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';
import { PhotoCategoryStoreSelectors } from './photo-category-store';
import { VideoCategoryStoreSelectors } from './video-category-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    SettingsStoreSelectors.selectSettingsError,
    PhotoCategoryStoreSelectors.selectPhotoCategoryError,
    VideoCategoryStoreSelectors.selectVideoCategoryError,
    (settingsError: string, photoCategoryError: string, videoCategoryError: string) => {
        return settingsError || photoCategoryError || videoCategoryError;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    SettingsStoreSelectors.selectSettingsIsLoading,
    PhotoCategoryStoreSelectors.selectPhotoCategoryIsLoading,
    VideoCategoryStoreSelectors.selectVideoCategoryIsLoading,
    (settingsIsLoading: boolean, photoCategoryIsLoading: boolean, videoCategoryIsLoading: boolean) => {
        return settingsIsLoading || photoCategoryIsLoading || videoCategoryIsLoading;
    }
);
