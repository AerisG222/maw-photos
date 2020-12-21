import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Settings } from 'src/app/models/settings.model';
import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';
import { VideoSize } from 'src/app/models/video-size.model';
import { Theme } from 'src/app/models/theme.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryFilter } from 'src/app/models/category-filter.model';
import { CategoryListType } from 'src/app/models/category-list-type.model';

export const settingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const selectSettingsError = createSelector(
    settingsState,
    (state: State): string | null => state.error
);

export const selectSettingsIsLoading = createSelector(
    settingsState,
    (state: State): boolean => state.isLoading
);

export const selectSettings = createSelector(
    settingsState,
    (state: State): Settings => state.settings
);

export const selectAppTheme = createSelector(
    settingsState,
    (state: State): Theme => state.settings.appTheme
);

// -- CATEGORY LIST --
export const selectCategoryListCategoryFilter = createSelector(
    settingsState,
    (state: State): CategoryFilter => state.settings.categoryListCategoryFilter
);

export const selectCategoryListCategoryMargin = createSelector(
    settingsState,
    (state: State): CategoryMargin => state.settings.categoryListCategoryMargin
);

export const selectCategoryListMissingGpsFilter = createSelector(
    settingsState,
    (state: State): boolean => state.settings.categoryListMissingGpsFilter
);

export const selectCategoryListShowCategoryTitles = createSelector(
    settingsState,
    (state: State): boolean => state.settings.categoryListShowCategoryTitles
);

export const selectCategoryListThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.categoryListThumbnailSize
);

export const selectCategoryListYearFilter = createSelector(
    settingsState,
    (state: State): string | number => state.settings.categoryListYearFilter
);

export const selectCategoryListListType = createSelector(
    settingsState,
    (state: State): CategoryListType => state.settings.categoryListListType
);

export const selectCategoryListListViewThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.categoryListListViewThumbnailSize
);

// -- PHOTO GRID --
export const selectPhotoGridMargin = createSelector(
    settingsState,
    (state: State): CategoryMargin => state.settings.photoGridMargin
);

export const selectPhotoGridShowCategoryBreadcrumbs = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoGridShowCategoryBreadcrumbs
);

export const selectPhotoGridThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.photoGridThumbnailSize
);

// -- PHOTO INFO PANEL --
export const selectPhotoInfoPanelShowRatings = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowRatings
);

export const selectPhotoInfoPanelShowCategoryTeaserChooser = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowCategoryTeaserChooser
);

export const selectPhotoInfoPanelShowComments = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowComments
);

export const selectPhotoInfoPanelShowExif = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowExif
);

export const selectPhotoInfoPanelShowEffects = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowEffects
);

export const selectPhotoInfoPanelShowHistogram = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowHistogram
);

export const selectPhotoInfoPanelShowMetadataEditor = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowMetadataEditor
);

export const selectPhotoInfoPanelShowMinimap = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowMinimap
);

export const selectPhotoInfoPanelExpandedState = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelExpandedState
);

export const selectPhotoInfoPanelMinimapMapTypeId = createSelector(
    settingsState,
    (state: State): string => state.settings.photoInfoPanelMinimapMapTypeId
);

export const selectPhotoInfoPanelMinimapZoom = createSelector(
    settingsState,
    (state: State): number => state.settings.photoInfoPanelMinimapZoom
);

// -- PHOTO LIST --
export const selectPhotoListShowPhotoList = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoListShowPhotoList
);

export const selectPhotoListMapViewMapTypeId = createSelector(
    settingsState,
    (state: State): string => state.settings.photoListMapViewMapTypeId
);

export const selectPhotoListMapViewZoom = createSelector(
    settingsState,
    (state: State): number => state.settings.photoListMapViewZoom
);

export const selectPhotoListSlideshowDisplayDurationSeconds = createSelector(
    settingsState,
    (state: State): number => state.settings.photoListSlideshowDisplayDurationSeconds
);

// -- VIDEO LIST --
export const selectVideoListShowVideoList = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoListShowVideoList
);

export const selectVideoListVideoSize = createSelector(
    settingsState,
    (state: State): VideoSize => state.settings.videoListVideoSize
);

// -- VIDEO INFO PANEL --
export const selectVideoInfoPanelShowRatings = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowRatings
);

export const selectVideoInfoPanelShowCategoryTeaserChooser = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowCategoryTeaserChooser
);

export const selectVideoInfoPanelShowComments = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowComments
);

export const selectVideoInfoPanelShowMetadataEditor = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowMetadataEditor
);

export const selectVideoInfoPanelShowMinimap = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowMinimap
);

export const selectVideoInfoPanelExpandedState = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelExpandedState
);

export const selectVideoInfoPanelMinimapMapTypeId = createSelector(
    settingsState,
    (state: State): string => state.settings.videoInfoPanelMinimapMapTypeId
);

export const selectVideoInfoPanelMinimapZoom = createSelector(
    settingsState,
    (state: State): number => state.settings.videoInfoPanelMinimapZoom
);

// -- SEARCH VIEW --
export const selectSearchCategoryMargin = createSelector(
    settingsState,
    (state: State): CategoryMargin => state.settings.searchCategoryMargin
);

export const selectSearchShowCategoryTitles = createSelector(
    settingsState,
    (state: State): boolean => state.settings.searchShowCategoryTitles
);

export const selectSearchShowCategoryYears = createSelector(
    settingsState,
    (state: State): boolean => state.settings.searchShowCategoryYears
);

export const selectSearchThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.searchThumbnailSize
);

export const selectSearchListType = createSelector(
    settingsState,
    (state: State): CategoryListType => state.settings.searchListType
);

export const selectSearchListViewThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.searchListViewThumbnailSize
);
