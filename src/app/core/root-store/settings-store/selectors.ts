import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { Settings } from 'src/app/core/models/settings.model';
import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSettings = (state: State): Settings => state.settings;

const getPhotoInfoPanelShowRatings = (state: State): boolean => state.settings.photoInfoPanelShowRatings;
const getPhotoInfoPanelShowComments = (state: State): boolean => state.settings.photoInfoPanelShowComments;
const getPhotoInfoPanelShowExif = (state: State): boolean => state.settings.photoInfoPanelShowExif;
const getPhotoInfoPanelShowEffects = (state: State): boolean => state.settings.photoInfoPanelShowEffects;
const getPhotoInfoPanelShowMinimap = (state: State): boolean => state.settings.photoInfoPanelShowMinimap;
const getPhotoInfoPanelExpandedState = (state: State): boolean => state.settings.photoInfoPanelExpandedState;

const getPhotoListToolbarExpandedState = (state: State): boolean => state.settings.photoListToolbarExpandedState;
const getPhotoListFullscreenToolbarExpandedState = (state: State): boolean => state.settings.photoListFullscreenToolbarExpandedState;

export const selectSettingsState: MemoizedSelector<object, State> = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

// tslint:disable:max-line-length
export const selectSettingsError: MemoizedSelector<object, string> = createSelector(selectSettingsState, getError);
export const selectSettingsIsLoading: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getIsLoading);
export const selectSettings: MemoizedSelector<object, Settings> = createSelector(selectSettingsState, getSettings);

export const selectPhotoInfoPanelShowRatings: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowRatings);
export const selectPhotoInfoPanelShowComments: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowComments);
export const selectPhotoInfoPanelShowExif: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowExif);
export const selectPhotoInfoPanelShowEffects: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowEffects);
export const selectPhotoInfoPanelShowMinimap: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelShowMinimap);
export const selectPhotoInfoPanelExpandedState: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoInfoPanelExpandedState);

export const selectPhotoListToolbarExpandedState: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoListToolbarExpandedState);
export const selectPhotoListFullscreenToolbarExpandedState: MemoizedSelector<object, boolean> = createSelector(selectSettingsState, getPhotoListFullscreenToolbarExpandedState);
