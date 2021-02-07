import { createReducer, on } from '@ngrx/store';

import { initialState, State } from './state';
import * as SettingsActions from './actions';

export const reducer = createReducer(
    initialState,
    on(
        SettingsActions.loadSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: { ...settings }
        })
    ),
    on(
        SettingsActions.saveAppSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                app: settings
            }
        })
    ),
    on(
        SettingsActions.saveCategoryFilterSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                categoryFilter: settings
            }
        })
    ),
    on(
        SettingsActions.saveCategoryGridViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                categoryGridView: settings
            }
        })
    ),
    on(
        SettingsActions.saveCategoryListViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                categoryListView: settings
            }
        })
    ),
    on(
        SettingsActions.saveCategoryPageSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                categoryPage: settings
            }
        })
    ),
    on(
        SettingsActions.savePhotoDetailViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                photoDetailView: settings
            }
        })
    ),
    on(
        SettingsActions.savePhotoGridViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                photoGridView: settings
            }
        })
    ),
    on(
        SettingsActions.savePhotoInfoPanelSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                photoInfoPanel: settings
            }
        })
    ),
    on(
        SettingsActions.savePhotoMapViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                photoMapView: settings
            }
        })
    ),
    on(
        SettingsActions.savePhotoPageSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                photoPage: settings
            }
        })
    ),
    on(
        SettingsActions.saveRandomDetailViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                randomDetailView: settings
            }
        })
    ),
    on(
        SettingsActions.saveRandomGridViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                randomGridView: settings
            }
        })
    ),
    on(
        SettingsActions.saveRandomInfoPanelSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                randomInfoPanel: settings
            }
        })
    ),
    on(
        SettingsActions.saveRandomPageSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                randomPage: settings
            }
        })
    ),
    on(
        SettingsActions.saveSearchGridViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                searchGridView: settings
            }
        })
    ),
    on(
        SettingsActions.saveSearchListViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                searchListView: settings
            }
        })
    ),
    on(
        SettingsActions.saveSearchPageSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                searchPage: settings
            }
        })
    ),
    on(
        SettingsActions.saveVideoDetailViewSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                videoDetailView: settings
            }
        })
    ),
    on(
        SettingsActions.saveVideoInfoPanelSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                videoInfoPanel: settings
            }
        })
    ),
    on(
        SettingsActions.saveVideoPageSettingsSuccess,
        (state, { settings }): State => ({
            ...state,
            settings: {
                ...state.settings,
                videoPage: settings
            }
        })
    ),
);
