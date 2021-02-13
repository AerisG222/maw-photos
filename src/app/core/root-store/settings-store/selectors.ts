import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';
import { Settings } from '@models';
import { AppSettings } from '@models';
import { CategoryFilterSettings } from '@models';
import { CategoryGridViewSettings } from '@models';
import { CategoryListViewSettings } from '@models';
import { CategoryPageSettings } from '@models';
import { PhotoDetailViewSettings } from '@models';
import { PhotoGridViewSettings } from '@models';
import { PhotoInfoPanelSettings } from '@models';
import { PhotoMapViewSettings } from '@models';
import { PhotoPageSettings } from '@models';
import { RandomPageSettings } from '@models';
import { SearchGridViewSettings } from '@models';
import { SearchListViewSettings } from '@models';
import { SearchPageSettings } from '@models';
import { VideoDetailViewSettings } from '@models';
import { VideoInfoPanelSettings } from '@models';

const settingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

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
