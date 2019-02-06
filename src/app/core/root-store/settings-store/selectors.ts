import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { Settings } from '../../models/settings.model';
import { State } from './state';
import { SETTINGS_FEATURE_NAME } from './feature-name';

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSettings = (state: State): Settings => state.settings;
const getPhotoInfoPanelShowRatings = (state: State): boolean => state.settings.photoInfoPanelShowRatings;
const getPhotoInfoPanelShowComments = (state: State): boolean => state.settings.photoInfoPanelShowComments;
const getPhotoInfoPanelShowExif = (state: State): boolean => state.settings.photoInfoPanelShowExif;
const getPhotoInfoPanelShowEffects = (state: State): boolean => state.settings.photoInfoPanelShowEffects;

export const selectSettingsState: MemoizedSelector<object, State> = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

// tslint:disable:max-line-length
export const selectSettingsError: MemoizedSelector<object, string> = createSelector(selectSettingsState, getError);
export const selectSettingsIsLoading: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getIsLoading);
export const selectSettings: MemoizedSelector<object, Settings> = createSelector(selectSettingsState, getSettings);
export const selectPhotoInfoPanelShowRatings: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowRatings);
export const selectPhotoInfoPanelShowComments: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowComments);
export const selectPhotoInfoPanelShowExif: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowExif);
export const selectPhotoInfoPanelShowEffects: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowEffects);
