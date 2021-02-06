import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';
import { Settings } from 'src/app/models/settings/settings';
import { AppSettings } from 'src/app/models/settings/app-settings';
import { CategoryFilterSettings } from 'src/app/models/settings/category-filter-settings';
import { CategoryGridViewSettings } from 'src/app/models/settings/category-grid-view-settings';
import { CategoryListViewSettings } from 'src/app/models/settings/category-list-view-settings';
import { CategoryPageSettings } from 'src/app/models/settings/category-page-settings';
import { PhotoDetailViewSettings } from 'src/app/models/settings/photo-detail-view-settings';
import { PhotoGridViewSettings } from 'src/app/models/settings/photo-grid-view-settings';
import { PhotoInfoPanelSettings } from 'src/app/models/settings/photo-info-panel-settings';
import { PhotoMapViewSettings } from 'src/app/models/settings/photo-map-view-settings';
import { PhotoPageSettings } from 'src/app/models/settings/photo-page-settings';
import { RandomPageSettings } from 'src/app/models/settings/random-page-settings';
import { SearchGridViewSettings } from 'src/app/models/settings/search-grid-view-settings';
import { SearchListViewSettings } from 'src/app/models/settings/search-list-view-settings';
import { SearchPageSettings } from 'src/app/models/settings/search-page-settings';
import { VideoDetailViewSettings } from 'src/app/models/settings/video-detail-view-settings';
import { VideoInfoPanelSettings } from 'src/app/models/settings/video-info-panel-settings';
import { VideoPageSettings } from 'src/app/models/settings/video-page-settings';

const settingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const error = createSelector(
    settingsState,
    (state: State): string | null => state.error
);

export const settings = createSelector(
    settingsState,
    (state: State): Settings => state.settings
);

export const appSettings = createSelector(
    settings,
    (s): AppSettings => s.app
);

export const categoryFilterSettings = createSelector(
    settings,
    (s): CategoryFilterSettings => s.categoryFilter
);

export const categoryGridViewSettings = createSelector(
    settings,
    (s): CategoryGridViewSettings => s.categoryGridView
);

export const categoryListViewSettings = createSelector(
    settings,
    (s): CategoryListViewSettings => s.categoryListView
);

export const categoryPageSettings = createSelector(
    settings,
    (s): CategoryPageSettings => s.categoryPage
);

export const photoDetailViewSettings = createSelector(
    settings,
    (s): PhotoDetailViewSettings => s.photoDetailView
);

export const photoGridViewSettings = createSelector(
    settings,
    (s): PhotoGridViewSettings => s.photoGridView
);

export const photoInfoPanelSettings = createSelector(
    settings,
    (s): PhotoInfoPanelSettings => s.photoInfoPanel
);

export const photoMapViewSettings = createSelector(
    settings,
    (s): PhotoMapViewSettings => s.photoMapView
);

export const photoPageSettings = createSelector(
    settings,
    (s): PhotoPageSettings => s.photoPage
);

export const randomDetailViewSettings = createSelector(
    settings,
    (s): PhotoDetailViewSettings => s.randomDetailView
);

export const randomGridViewSettings = createSelector(
    settings,
    (s): PhotoGridViewSettings => s.randomGridView
);

export const randomInfoPanelSettings = createSelector(
    settings,
    (s): PhotoInfoPanelSettings => s.randomInfoPanel
);

export const randomPageSettings = createSelector(
    settings,
    (s): RandomPageSettings => s.randomPage
);

export const searchGridViewSettings = createSelector(
    settings,
    (s): SearchGridViewSettings => s.searchGridView
);

export const searchListViewSettings = createSelector(
    settings,
    (s): SearchListViewSettings => s.searchListView
);

export const searchPageSettings = createSelector(
    settings,
    (s): SearchPageSettings => s.searchPage
);

export const videoDetailViewSettings = createSelector(
    settings,
    (s): VideoDetailViewSettings => s.videoDetailView
);

export const videoInfoPanelSettings = createSelector(
    settings,
    (s): VideoInfoPanelSettings => s.videoInfoPanel
);

export const videoPageSettings = createSelector(
    settings,
    (s): VideoPageSettings => s.videoPage
);
