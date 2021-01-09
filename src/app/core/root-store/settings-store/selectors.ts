import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
    Settings,
    VideoSize,
    Theme,
    CategoryMargin,
    ThumbnailSize,
    CategoryFilter,
    CategoryListType,
    GoogleMapThemes,
} from '@models';
import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';

const settingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const error = createSelector(
    settingsState,
    (state: State): string | null => state.error
);

export const isLoading = createSelector(
    settingsState,
    (state: State): boolean => state.isLoading
);

export const settings = createSelector(
    settingsState,
    (state: State): Settings => state.settings
);

export const appTheme = createSelector(
    settingsState,
    (state: State): Theme => state.settings.appTheme
);

export const mapTheme = createSelector(
    appTheme,
    theme => theme.isDark ? GoogleMapThemes.themeDark : GoogleMapThemes.themeLight
);

// -- CATEGORY LIST --
export const categoryListCategoryFilter = createSelector(
    settingsState,
    (state: State): CategoryFilter => state.settings.categoryListCategoryFilter
);

export const categoryListCategoryMargin = createSelector(
    settingsState,
    (state: State): CategoryMargin => state.settings.categoryListCategoryMargin
);

export const categoryListMissingGpsFilter = createSelector(
    settingsState,
    (state: State): boolean => state.settings.categoryListMissingGpsFilter
);

export const categoryListShowCategoryTitles = createSelector(
    settingsState,
    (state: State): boolean => state.settings.categoryListShowCategoryTitles
);

export const categoryListThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.categoryListThumbnailSize
);

export const categoryListYearFilter = createSelector(
    settingsState,
    (state: State): string | number => state.settings.categoryListYearFilter
);

export const categoryListListType = createSelector(
    settingsState,
    (state: State): CategoryListType => state.settings.categoryListListType
);

export const categoryListListViewThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.categoryListListViewThumbnailSize
);

export const categoryListShouldShowListView = createSelector(
    categoryListListType,
    (type: CategoryListType): boolean => type.name === CategoryListType.list.name
);

export const categoryListShouldShowGridView = createSelector(
    categoryListListType,
    (type: CategoryListType): boolean => type.name === CategoryListType.grid.name
);

// -- PHOTO GRID --
export const photoGridMargin = createSelector(
    settingsState,
    (state: State): CategoryMargin => state.settings.photoGridMargin
);

export const photoGridShowCategoryBreadcrumbs = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoGridShowCategoryBreadcrumbs
);

export const photoGridThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.photoGridThumbnailSize
);

// -- PHOTO INFO PANEL --
export const photoInfoPanelShowRatings = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowRatings
);

export const photoInfoPanelShowCategoryTeaserChooser = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowCategoryTeaserChooser
);

export const photoInfoPanelShowComments = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowComments
);

export const photoInfoPanelShowExif = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowExif
);

export const photoInfoPanelShowEffects = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowEffects
);

export const photoInfoPanelShowHistogram = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowHistogram
);

export const photoInfoPanelShowMetadataEditor = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowMetadataEditor
);

export const photoInfoPanelShowMinimap = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelShowMinimap
);

export const photoInfoPanelExpandedState = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoInfoPanelExpandedState
);

export const photoInfoPanelMinimapMapTypeId = createSelector(
    settingsState,
    (state: State): string => state.settings.photoInfoPanelMinimapMapTypeId
);

export const photoInfoPanelMinimapZoom = createSelector(
    settingsState,
    (state: State): number => state.settings.photoInfoPanelMinimapZoom
);

// -- PHOTO LIST --
export const photoListShowPhotoList = createSelector(
    settingsState,
    (state: State): boolean => state.settings.photoListShowPhotoList
);

export const photoListMapViewMapTypeId = createSelector(
    settingsState,
    (state: State): string => state.settings.photoListMapViewMapTypeId
);

export const photoListMapViewZoom = createSelector(
    settingsState,
    (state: State): number => state.settings.photoListMapViewZoom
);

export const photoListSlideshowDisplayDurationSeconds = createSelector(
    settingsState,
    (state: State): number => state.settings.photoListSlideshowDisplayDurationSeconds
);

// -- VIDEO LIST --
export const videoListShowVideoList = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoListShowVideoList
);

export const videoListVideoSize = createSelector(
    settingsState,
    (state: State): VideoSize => state.settings.videoListVideoSize
);

// -- VIDEO INFO PANEL --
export const videoInfoPanelShowRatings = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowRatings
);

export const videoInfoPanelShowCategoryTeaserChooser = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowCategoryTeaserChooser
);

export const videoInfoPanelShowComments = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowComments
);

export const videoInfoPanelShowMetadataEditor = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowMetadataEditor
);

export const videoInfoPanelShowMinimap = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelShowMinimap
);

export const videoInfoPanelExpandedState = createSelector(
    settingsState,
    (state: State): boolean => state.settings.videoInfoPanelExpandedState
);

export const videoInfoPanelMinimapMapTypeId = createSelector(
    settingsState,
    (state: State): string => state.settings.videoInfoPanelMinimapMapTypeId
);

export const videoInfoPanelMinimapZoom = createSelector(
    settingsState,
    (state: State): number => state.settings.videoInfoPanelMinimapZoom
);

// -- SEARCH VIEW --
export const searchCategoryMargin = createSelector(
    settingsState,
    (state: State): CategoryMargin => state.settings.searchCategoryMargin
);

export const searchShowCategoryTitles = createSelector(
    settingsState,
    (state: State): boolean => state.settings.searchShowCategoryTitles
);

export const searchShowCategoryYears = createSelector(
    settingsState,
    (state: State): boolean => state.settings.searchShowCategoryYears
);

export const searchThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.searchThumbnailSize
);

export const searchListType = createSelector(
    settingsState,
    (state: State): CategoryListType => state.settings.searchListType
);

export const searchListViewThumbnailSize = createSelector(
    settingsState,
    (state: State): ThumbnailSize => state.settings.searchListViewThumbnailSize
);

export const showSearchResultsInListView = createSelector(
    searchListType,
    type => type.name === CategoryListType.list.name
);

export const showSearchResultsInGridView = createSelector(
    searchListType,
    type => type.name === CategoryListType.grid.name
);
