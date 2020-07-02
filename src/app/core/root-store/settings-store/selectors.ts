import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { Settings } from 'src/app/models/settings.model';
import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';
import { VideoSize } from 'src/app/models/video-size.model';
import { Theme } from 'src/app/models/theme.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { CategoryFilter } from 'src/app/models/category-filter.model';
import { CategoryListType } from 'src/app/models/category-list-type.model';

const getError = (state: State): string | null => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSettings = (state: State): Settings => state.settings;

const getAppTheme = (state: State): Theme => state.settings.appTheme;

const getCategoryListCategoryFilter = (state: State): CategoryFilter => state.settings.categoryListCategoryFilter;
const getCategoryListCategoryMargin = (state: State): CategoryMargin => state.settings.categoryListCategoryMargin;
const getCategoryListMissingGpsFilter = (state: State): boolean => state.settings.categoryListMissingGpsFilter;
const getCategoryListShowCategoryTitles = (state: State): boolean => state.settings.categoryListShowCategoryTitles;
const getCategoryListThumbnailSize = (state: State): ThumbnailSize => state.settings.categoryListThumbnailSize;
const getCategoryListYearFilter = (state: State): string | number => state.settings.categoryListYearFilter;
const getCategoryListListType = (state: State): CategoryListType => state.settings.categoryListListType;
const getCategoryListListViewThumbnailSize = (state: State): ThumbnailSize => state.settings.categoryListListViewThumbnailSize;

const getPhotoInfoPanelShowRatings = (state: State): boolean => state.settings.photoInfoPanelShowRatings;
const getPhotoInfoPanelShowCategoryTeaserChooser = (state: State): boolean => state.settings.photoInfoPanelShowCategoryTeaserChooser;
const getPhotoInfoPanelShowComments = (state: State): boolean => state.settings.photoInfoPanelShowComments;
const getPhotoInfoPanelShowExif = (state: State): boolean => state.settings.photoInfoPanelShowExif;
const getPhotoInfoPanelShowEffects = (state: State): boolean => state.settings.photoInfoPanelShowEffects;
const getPhotoInfoPanelShowHistogram = (state: State): boolean => state.settings.photoInfoPanelShowHistogram;
const getPhotoInfoPanelShowMetadataEditor = (state: State): boolean => state.settings.photoInfoPanelShowMetadataEditor;
const getPhotoInfoPanelShowMinimap = (state: State): boolean => state.settings.photoInfoPanelShowMinimap;
const getPhotoInfoPanelExpandedState = (state: State): boolean => state.settings.photoInfoPanelExpandedState;
const getPhotoInfoPanelMinimapMapTypeId = (state: State): string => state.settings.photoInfoPanelMinimapMapTypeId;
const getPhotoInfoPanelMinimapZoom = (state: State): number => state.settings.photoInfoPanelMinimapZoom;

const getPhotoListShowPhotoList = (state: State): boolean => state.settings.photoListShowPhotoList;
const getPhotoListMapViewMapTypeId = (state: State): string => state.settings.photoListMapViewMapTypeId;
const getPhotoListMapViewZoom = (state: State): number => state.settings.photoListMapViewZoom;

const getVideoListShowVideoList = (state: State): boolean => state.settings.videoListShowVideoList;
const getVideoListVideoSize = (state: State): VideoSize => state.settings.videoListVideoSize;

const getVideoInfoPanelShowRatings = (state: State): boolean => state.settings.videoInfoPanelShowRatings;
const getVideoInfoPanelShowCategoryTeaserChooser = (state: State): boolean => state.settings.videoInfoPanelShowCategoryTeaserChooser;
const getVideoInfoPanelShowComments = (state: State): boolean => state.settings.videoInfoPanelShowComments;
const getVideoInfoPanelShowMetadataEditor = (state: State): boolean => state.settings.videoInfoPanelShowMetadataEditor;
const getVideoInfoPanelShowMinimap = (state: State): boolean => state.settings.videoInfoPanelShowMinimap;
const getVideoInfoPanelExpandedState = (state: State): boolean => state.settings.videoInfoPanelExpandedState;
const getVideoInfoPanelMinimapMapTypeId = (state: State): string => state.settings.videoInfoPanelMinimapMapTypeId;
const getVideoInfoPanelMinimapZoom = (state: State): number => state.settings.videoInfoPanelMinimapZoom;

const getSearchCategoryMargin = (state: State): CategoryMargin => state.settings.searchCategoryMargin;
const getSearchShowCategoryTitles = (state: State): boolean => state.settings.searchShowCategoryTitles;
const getSearchShowCategoryYears = (state: State): boolean => state.settings.searchShowCategoryYears;
const getSearchThumbnailSize = (state: State): ThumbnailSize => state.settings.searchThumbnailSize;
const getSearchListType = (state: State): CategoryListType => state.settings.searchListType;
const getSearchListViewThumbnailSize = (state: State): ThumbnailSize => state.settings.searchListViewThumbnailSize;

export const selectSettingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const selectSettingsError = createSelector(selectSettingsState, getError);
export const selectSettingsIsLoading = createSelector(selectSettingsState, getIsLoading);
export const selectSettings = createSelector(selectSettingsState, getSettings);

export const selectAppTheme = createSelector(selectSettingsState, getAppTheme);

export const selectCategoryListCategoryFilter = createSelector(selectSettingsState, getCategoryListCategoryFilter);
export const selectCategoryListCategoryMargin = createSelector(selectSettingsState, getCategoryListCategoryMargin);
export const selectCategoryListMissingGpsFilter = createSelector(selectSettingsState, getCategoryListMissingGpsFilter);
export const selectCategoryListShowCategoryTitles = createSelector(selectSettingsState, getCategoryListShowCategoryTitles);
export const selectCategoryListThumbnailSize = createSelector(selectSettingsState, getCategoryListThumbnailSize);
export const selectCategoryListYearFilter = createSelector(selectSettingsState, getCategoryListYearFilter);
export const selectCategoryListListType = createSelector(selectSettingsState, getCategoryListListType);
export const selectCategoryListListViewThumbnailSize = createSelector(selectSettingsState, getCategoryListListViewThumbnailSize);

export const selectPhotoInfoPanelShowRatings = createSelector(selectSettingsState, getPhotoInfoPanelShowRatings);
// tslint:disable-next-line: max-line-length
export const selectPhotoInfoPanelShowCategoryTeaserChooser = createSelector(selectSettingsState, getPhotoInfoPanelShowCategoryTeaserChooser);
export const selectPhotoInfoPanelShowComments = createSelector(selectSettingsState, getPhotoInfoPanelShowComments);
export const selectPhotoInfoPanelShowExif = createSelector(selectSettingsState, getPhotoInfoPanelShowExif);
export const selectPhotoInfoPanelShowEffects = createSelector(selectSettingsState, getPhotoInfoPanelShowEffects);
export const selectPhotoInfoPanelShowHistogram = createSelector(selectSettingsState, getPhotoInfoPanelShowHistogram);
export const selectPhotoInfoPanelShowMetadataEditor = createSelector(selectSettingsState, getPhotoInfoPanelShowMetadataEditor);
export const selectPhotoInfoPanelShowMinimap = createSelector(selectSettingsState, getPhotoInfoPanelShowMinimap);
export const selectPhotoInfoPanelExpandedState = createSelector(selectSettingsState, getPhotoInfoPanelExpandedState);
export const selectPhotoInfoPanelMinimapMapTypeId = createSelector(selectSettingsState, getPhotoInfoPanelMinimapMapTypeId);
export const selectPhotoInfoPanelMinimapZoom = createSelector(selectSettingsState, getPhotoInfoPanelMinimapZoom);

export const selectPhotoListShowPhotoList = createSelector(selectSettingsState, getPhotoListShowPhotoList);
// tslint:disable-next-line: max-line-length
export const selectPhotoListMapViewMapTypeId = createSelector(selectSettingsState, getPhotoListMapViewMapTypeId);
export const selectPhotoListMapViewZoom = createSelector(selectSettingsState, getPhotoListMapViewZoom);

export const selectVideoListShowVideoList = createSelector(selectSettingsState, getVideoListShowVideoList);
export const selectVideoListVideoSize = createSelector(selectSettingsState, getVideoListVideoSize);

export const selectVideoInfoPanelShowRatings = createSelector(selectSettingsState, getVideoInfoPanelShowRatings);
// tslint:disable-next-line: max-line-length
export const selectVideoInfoPanelShowCategoryTeaserChooser = createSelector(selectSettingsState, getVideoInfoPanelShowCategoryTeaserChooser);
export const selectVideoInfoPanelShowComments = createSelector(selectSettingsState, getVideoInfoPanelShowComments);
export const selectVideoInfoPanelShowMinimap = createSelector(selectSettingsState, getVideoInfoPanelShowMinimap);
export const selectVideoInfoPanelExpandedState = createSelector(selectSettingsState, getVideoInfoPanelExpandedState);
export const selectVideoInfoPanelShowMetadataEditor = createSelector(selectSettingsState, getVideoInfoPanelShowMetadataEditor);
export const selectVideoInfoPanelMinimapMapTypeId = createSelector(selectSettingsState, getVideoInfoPanelMinimapMapTypeId);
export const selectVideoInfoPanelMinimapZoom = createSelector(selectSettingsState, getVideoInfoPanelMinimapZoom);

export const selectSearchCategoryMargin = createSelector(selectSettingsState, getSearchCategoryMargin);
export const selectSearchShowCategoryTitles = createSelector(selectSettingsState, getSearchShowCategoryTitles);
export const selectSearchShowCategoryYears = createSelector(selectSettingsState, getSearchShowCategoryYears);
export const selectSearchThumbnailSize = createSelector(selectSettingsState, getSearchThumbnailSize);
export const selectSearchListType = createSelector(selectSettingsState, getSearchListType);
export const selectSearchListViewThumbnailSize = createSelector(selectSettingsState, getSearchListViewThumbnailSize);
