import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { Settings } from '../../core/models/settings.model';
import { State } from './state';
import { SETTINGS_FEATURE_NAME } from './settings-store.module';

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSettings = (state: State): Settings => state.settings;

export const selectSettingsState: MemoizedSelector<object, State> = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const selectSettingsError: MemoizedSelector<object, string> = createSelector(selectSettingsState, getError);
export const selectSettingsIsLoading: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getIsLoading);
export const selectSettings: MemoizedSelector<object, Settings> = createSelector(selectSettingsState, getSettings);
