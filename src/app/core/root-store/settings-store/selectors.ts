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

export const selectSettings = createSelector(
    settingsState,
    (state: State): Settings => state.settings
);

export const selectAppSettings = createSelector(selectSettings, (s): AppSettings => s.app);

export const selectCategoryFilterSettings = createSelector(
    selectSettings,
    (s): CategoryFilterSettings => s.categoryFilter
);

export const selectCategoryGridViewSettings = createSelector(
    selectSettings,
    (s): CategoryGridViewSettings => s.categoryGridView
);

export const selectCategoryListViewSettings = createSelector(
    selectSettings,
    (s): CategoryListViewSettings => s.categoryListView
);

export const selectCategoryPageSettings = createSelector(
    selectSettings,
    (s): CategoryPageSettings => s.categoryPage
);

export const selectPhotoDetailViewSettings = createSelector(
    selectSettings,
    (s): PhotoDetailViewSettings => s.photoDetailView
);

export const selectPhotoGridViewSettings = createSelector(
    selectSettings,
    (s): PhotoGridViewSettings => s.photoGridView
);

export const selectPhotoInfoPanelSettings = createSelector(
    selectSettings,
    (s): PhotoInfoPanelSettings => s.photoInfoPanel
);

export const selectPhotoMapViewSettings = createSelector(
    selectSettings,
    (s): PhotoMapViewSettings => s.photoMapView
);

export const selectPhotoPageSettings = createSelector(
    selectSettings,
    (s): PhotoPageSettings => s.photoPage
);

export const selectRandomDetailViewSettings = createSelector(
    selectSettings,
    (s): PhotoDetailViewSettings => s.randomDetailView
);

export const selectRandomGridViewSettings = createSelector(
    selectSettings,
    (s): PhotoGridViewSettings => s.randomGridView
);

export const selectRandomInfoPanelSettings = createSelector(
    selectSettings,
    (s): PhotoInfoPanelSettings => s.randomInfoPanel
);

export const selectRandomPageSettings = createSelector(
    selectSettings,
    (s): RandomPageSettings => s.randomPage
);

export const selectSearchGridViewSettings = createSelector(
    selectSettings,
    (s): SearchGridViewSettings => s.searchGridView
);

export const selectSearchListViewSettings = createSelector(
    selectSettings,
    (s): SearchListViewSettings => s.searchListView
);

export const selectSearchPageSettings = createSelector(
    selectSettings,
    (s): SearchPageSettings => s.searchPage
);

export const selectVideoDetailViewSettings = createSelector(
    selectSettings,
    (s): VideoDetailViewSettings => s.videoDetailView
);

export const selectVideoInfoPanelSettings = createSelector(
    selectSettings,
    (s): VideoInfoPanelSettings => s.videoInfoPanel
);
