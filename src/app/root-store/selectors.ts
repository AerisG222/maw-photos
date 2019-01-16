import { createSelector, MemoizedSelector } from '@ngrx/store';

import { SettingsStoreSelectors } from './settings-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    SettingsStoreSelectors.selectSettingsError,
    (settingsError: string) => {
        return settingsError;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    SettingsStoreSelectors.selectSettingsIsLoading,
    (settingsIsLoading: boolean) => {
        return settingsIsLoading;
    }
);
