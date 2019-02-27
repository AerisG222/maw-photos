import {
    createFeatureSelector,
    createSelector
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

export const selectSettingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const selectSettingsError = createSelector(selectSettingsState, getError);
export const selectSettingsIsLoading = createSelector(selectSettingsState, getIsLoading);
export const selectSettings = createSelector(selectSettingsState, getSettings);

export const selectPhotoInfoPanelShowRatings = createSelector(selectSettingsState, getPhotoInfoPanelShowRatings);
export const selectPhotoInfoPanelShowComments = createSelector(selectSettingsState, getPhotoInfoPanelShowComments);
export const selectPhotoInfoPanelShowExif = createSelector(selectSettingsState, getPhotoInfoPanelShowExif);
export const selectPhotoInfoPanelShowEffects = createSelector(selectSettingsState, getPhotoInfoPanelShowEffects);
export const selectPhotoInfoPanelShowMinimap = createSelector(selectSettingsState, getPhotoInfoPanelShowMinimap);
export const selectPhotoInfoPanelExpandedState = createSelector(selectSettingsState, getPhotoInfoPanelExpandedState);

export const selectPhotoListToolbarExpandedState = createSelector(selectSettingsState, getPhotoListToolbarExpandedState);
// tslint:disable-next-line: max-line-length
export const selectPhotoListFullscreenToolbarExpandedState = createSelector(selectSettingsState, getPhotoListFullscreenToolbarExpandedState);
