import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { Settings } from 'src/app/core/models/settings.model';
import { SETTINGS_FEATURE_NAME } from './feature-name';
import { State } from './state';
import { VideoSize } from '../../models/video-size.model';
import { Theme } from '../../models/theme.model';
import { CategoryMargin } from '../../models/category-margin.model';
import { ThumbnailSize } from '../../models/thumbnail-size.model';
import { CategoryFilter } from '../../models/category-filter.model';
import { CategoryListType } from '../../models/category-list-type.model';

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getSettings = (state: State): Settings => state.settings;

const getAppTheme = (state: State): Theme => state.settings.appTheme;

const getCategoryListCategoryFilter = (state: State): CategoryFilter => state.settings.categoryListCategoryFilter;
const getCategoryListCategoryMargin = (state: State): CategoryMargin => state.settings.categoryListCategoryMargin;
const getCategoryListShowCategoryTitles = (state: State): boolean => state.settings.categoryListShowCategoryTitles;
const getCategoryListThumbnailSize = (state: State): ThumbnailSize => state.settings.categoryListThumbnailSize;
const getCategoryListToolbarExpandedState = (state: State): boolean => state.settings.categoryListToolbarExpandedState;
const getCategoryListYearFilter = (state: State): string | number => state.settings.categoryListYearFilter;
const getCategoryListListType = (state: State): CategoryListType => state.settings.categoryListListType;
const getCategoryListListViewThumbnailSize = (state: State): ThumbnailSize => state.settings.categoryListListViewThumbnailSize;

const getPhotoInfoPanelShowRatings = (state: State): boolean => state.settings.photoInfoPanelShowRatings;
const getPhotoInfoPanelShowComments = (state: State): boolean => state.settings.photoInfoPanelShowComments;
const getPhotoInfoPanelShowExif = (state: State): boolean => state.settings.photoInfoPanelShowExif;
const getPhotoInfoPanelShowEffects = (state: State): boolean => state.settings.photoInfoPanelShowEffects;
const getPhotoInfoPanelShowHistogram = (state: State): boolean => state.settings.photoInfoPanelShowHistogram;
const getPhotoInfoPanelShowMinimap = (state: State): boolean => state.settings.photoInfoPanelShowMinimap;
const getPhotoInfoPanelExpandedState = (state: State): boolean => state.settings.photoInfoPanelExpandedState;
const getPhotoInfoPanelMinimapMapTypeId = (state: State): string => state.settings.photoInfoPanelMinimapMapTypeId;
const getPhotoInfoPanelMinimapZoom = (state: State): number => state.settings.photoInfoPanelMinimapZoom;

const getPhotoListShowPhotoList = (state: State): boolean => state.settings.photoListShowPhotoList;
const getPhotoListToolbarExpandedState = (state: State): boolean => state.settings.photoListToolbarExpandedState;
const getPhotoListFullscreenToolbarExpandedState = (state: State): boolean => state.settings.photoListFullscreenToolbarExpandedState;
const getPhotoListMapViewMapTypeId = (state: State): string => state.settings.photoListMapViewMapTypeId;
const getPhotoListMapViewZoom = (state: State): number => state.settings.photoListMapViewZoom;

const getVideoListShowVideoList = (state: State): boolean => state.settings.videoListShowVideoList;
const getVideoListToolbarExpandedState = (state: State): boolean => state.settings.videoListToolbarExpandedState;
const getVideoListVideoSize = (state: State): VideoSize => state.settings.videoListVideoSize;

const getVideoInfoPanelShowRatings = (state: State): boolean => state.settings.videoInfoPanelShowRatings;
const getVideoInfoPanelShowComments = (state: State): boolean => state.settings.videoInfoPanelShowComments;
const getVideoInfoPanelShowMinimap = (state: State): boolean => state.settings.videoInfoPanelShowMinimap;
const getVideoInfoPanelExpandedState = (state: State): boolean => state.settings.videoInfoPanelExpandedState;
const getVideoInfoPanelMinimapMapTypeId = (state: State): string => state.settings.videoInfoPanelMinimapMapTypeId;
const getVideoInfoPanelMinimapZoom = (state: State): number => state.settings.videoInfoPanelMinimapZoom;

export const selectSettingsState = createFeatureSelector<State>(SETTINGS_FEATURE_NAME);

export const selectSettingsError = createSelector(selectSettingsState, getError);
export const selectSettingsIsLoading = createSelector(selectSettingsState, getIsLoading);
export const selectSettings = createSelector(selectSettingsState, getSettings);

export const selectAppTheme = createSelector(selectSettingsState, getAppTheme);

export const selectCategoryListCategoryFilter = createSelector(selectSettingsState, getCategoryListCategoryFilter);
export const selectCategoryListCategoryMargin = createSelector(selectSettingsState, getCategoryListCategoryMargin);
export const selectCategoryListShowCategoryTitles = createSelector(selectSettingsState, getCategoryListShowCategoryTitles);
export const selectCategoryListThumbnailSize = createSelector(selectSettingsState, getCategoryListThumbnailSize);
export const selectCategoryListToolbarExpandedState = createSelector(selectSettingsState, getCategoryListToolbarExpandedState);
export const selectCategoryListYearFilter = createSelector(selectSettingsState, getCategoryListYearFilter);
export const selectCategoryListListType = createSelector(selectSettingsState, getCategoryListListType);
export const selectCategoryListListViewThumbnailSize = createSelector(selectSettingsState, getCategoryListListViewThumbnailSize);

export const selectPhotoInfoPanelShowRatings = createSelector(selectSettingsState, getPhotoInfoPanelShowRatings);
export const selectPhotoInfoPanelShowComments = createSelector(selectSettingsState, getPhotoInfoPanelShowComments);
export const selectPhotoInfoPanelShowExif = createSelector(selectSettingsState, getPhotoInfoPanelShowExif);
export const selectPhotoInfoPanelShowEffects = createSelector(selectSettingsState, getPhotoInfoPanelShowEffects);
export const selectPhotoInfoPanelShowHistogram = createSelector(selectSettingsState, getPhotoInfoPanelShowHistogram);
export const selectPhotoInfoPanelShowMinimap = createSelector(selectSettingsState, getPhotoInfoPanelShowMinimap);
export const selectPhotoInfoPanelExpandedState = createSelector(selectSettingsState, getPhotoInfoPanelExpandedState);
export const selectPhotoInfoPanelMinimapMapTypeId = createSelector(selectSettingsState, getPhotoInfoPanelMinimapMapTypeId);
export const selectPhotoInfoPanelMinimapZoom = createSelector(selectSettingsState, getPhotoInfoPanelMinimapZoom);

export const selectPhotoListShowPhotoList = createSelector(selectSettingsState, getPhotoListShowPhotoList);
export const selectPhotoListToolbarExpandedState = createSelector(selectSettingsState, getPhotoListToolbarExpandedState);
// tslint:disable-next-line: max-line-length
export const selectPhotoListFullscreenToolbarExpandedState = createSelector(selectSettingsState, getPhotoListFullscreenToolbarExpandedState);
export const selectPhotoListMapViewMapTypeId = createSelector(selectSettingsState, getPhotoListMapViewMapTypeId);
export const selectPhotoListMapViewZoom = createSelector(selectSettingsState, getPhotoListMapViewZoom);

export const selectVideoListShowVideoList = createSelector(selectSettingsState, getVideoListShowVideoList);
export const selectVideoListToolbarExpandedState = createSelector(selectSettingsState, getVideoListToolbarExpandedState);
export const selectVideoListVideoSize = createSelector(selectSettingsState, getVideoListVideoSize);

export const selectVideoInfoPanelShowRatings = createSelector(selectSettingsState, getVideoInfoPanelShowRatings);
export const selectVideoInfoPanelShowComments = createSelector(selectSettingsState, getVideoInfoPanelShowComments);
export const selectVideoInfoPanelShowMinimap = createSelector(selectSettingsState, getVideoInfoPanelShowMinimap);
export const selectVideoInfoPanelExpandedState = createSelector(selectSettingsState, getVideoInfoPanelExpandedState);
export const selectVideoInfoPanelMinimapMapTypeId = createSelector(selectSettingsState, getVideoInfoPanelMinimapMapTypeId);
export const selectVideoInfoPanelMinimapZoom = createSelector(selectSettingsState, getVideoInfoPanelMinimapZoom);
