import { createReducer, on } from '@ngrx/store';

import { initialState, State } from './state';
import * as SettingsActions from './actions';
import { CategoryMargin } from '@models';

export const reducer = createReducer(
    initialState,
    on(SettingsActions.updateMobileMarginsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListCategoryMargin: CategoryMargin.dense,
            searchCategoryMargin: CategoryMargin.dense
        }
    })),
    on(SettingsActions.loadRequest, (state): State => ({
        ...state,
        error: null,
        isLoading: true
    })),
    on(SettingsActions.loadSuccess, (state, { settings }): State => ({
        ...state,
        settings: { ...settings },
        error: null,
        isLoading: false
    })),
    on(SettingsActions.loadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(SettingsActions.saveRequest, (state): State => ({
        ...state,
        error: null
    })),
    on(SettingsActions.saveFailure, (state, { error }): State => ({
        ...state,
        error
    })),
    on(SettingsActions.saveSuccess, (state, { settings }): State => ({
        ...state,
        settings: { ...settings },
        error: null
    })),
    on(SettingsActions.toggleCategoryListCategoryTitlesRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListShowCategoryTitles: !state.settings.categoryListShowCategoryTitles
        }
    })),
    on(SettingsActions.toggleCategoryListMissingGpsFilterRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListMissingGpsFilter: !state.settings.categoryListMissingGpsFilter
        }
    })),
    on(SettingsActions.updateCategoryListYearFilterRequest, (state, { yearFilter }): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListYearFilter: yearFilter
        }
    })),
    on(SettingsActions.updateCategoryListCategoryFilterRequest, (state, { newFilter }): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListCategoryFilter: newFilter
        }
    })),
    on(SettingsActions.updateCategoryListCategoryMarginRequest, (state, { newMargin }): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListCategoryMargin: newMargin
        }
    })),
    on(SettingsActions.updateCategoryListListTypeRequest, (state, { newType }): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListViewMode: newType
        }
    })),
    on(SettingsActions.updateCategoryListListViewThumbnailSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListListViewThumbnailSize: newSize
        }
    })),
    on(SettingsActions.updateCategoryListThumbnailSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListThumbnailSize: newSize
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelCategoryTeaserChooserRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowCategoryTeaserChooser: !state.settings.photoInfoPanelShowCategoryTeaserChooser
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelCommentsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowComments: !state.settings.photoInfoPanelShowComments
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelEffectsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowEffects: !state.settings.photoInfoPanelShowEffects
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelExifRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowExif: !state.settings.photoInfoPanelShowExif
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelHistogramRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowHistogram: !state.settings.photoInfoPanelShowHistogram
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelRatingsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowRatings: !state.settings.photoInfoPanelShowRatings
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelMetadataEditorRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowMetadataEditor: !state.settings.photoInfoPanelShowMetadataEditor
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelMinimapRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowMinimap: !state.settings.photoInfoPanelShowMinimap
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelExpandedStateRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelExpandedState: !state.settings.photoInfoPanelExpandedState
        }
    })),
    on(SettingsActions.updatePhotoInfoPanelMinimapMapTypeRequest, (state, { mapType }): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelMinimapMapType: mapType
        }
    })),
    on(SettingsActions.updatePhotoInfoPanelMinimapZoomRequest, (state, { zoom }): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelMinimapZoom: zoom
        }
    })),
    on(SettingsActions.togglePhotoGridShowCategoryBreadcrumbsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoGridShowCategoryBreadcrumbs: !state.settings.photoGridShowCategoryBreadcrumbs
        }
    })),
    on(SettingsActions.updatePhotoGridMarginRequest, (state, { newMargin }): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoGridMargin: newMargin
        }
    })),
    on(SettingsActions.updatePhotoGridThumbnailSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoGridThumbnailSize: newSize
        }
    })),
    on(SettingsActions.togglePhotoListShowPhotoListRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoListShowPhotoList: !state.settings.photoListShowPhotoList
        }
    })),
    on(SettingsActions.updatePhotoListThumbnailSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoListThumbnailSize: newSize
        }
    })),
    on(SettingsActions.togglePhotoListCategoryBreadcrumbsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoListShowCategoryBreadcrumbs: !state.settings.photoListShowCategoryBreadcrumbs
        }
    })),
    on(SettingsActions.updatePhotoListMapViewMapTypeRequest, (state, { mapType }): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoListMapViewMapType: mapType
        }
    })),
    on(SettingsActions.updatePhotoListMapViewZoomRequest, (state, { zoom }): State => ({
        ...state,
        settings: {
            ...state.settings,
            photoListMapViewZoom: zoom
        }
    })),
    on(SettingsActions.toggleVideoListShowVideoListRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoListShowVideoList: !state.settings.videoListShowVideoList
        }
    })),
    on(SettingsActions.updateVideoListThumbnailSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoListThumbnailSize: newSize
        }
    })),
    on(SettingsActions.toggleVideoListCategoryBreadcrumbsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoListShowCategoryBreadcrumbs: !state.settings.videoListShowCategoryBreadcrumbs
        }
    })),
    on(SettingsActions.updateVideoListVideoSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoListVideoSize: newSize
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelCategoryTeaserChooserRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowCategoryTeaserChooser: !state.settings.videoInfoPanelShowCategoryTeaserChooser
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelCommentsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowComments: !state.settings.videoInfoPanelShowComments
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelRatingsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowRatings: !state.settings.videoInfoPanelShowRatings
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelMetadataEditorRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowMetadataEditor: !state.settings.videoInfoPanelShowMetadataEditor
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelMinimapRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowMinimap: !state.settings.videoInfoPanelShowMinimap
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelExpandedStateRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelExpandedState: !state.settings.videoInfoPanelExpandedState
        }
    })),
    on(SettingsActions.updateVideoInfoPanelMinimapMapTypeRequest, (state, { mapType }): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelMinimapMapType: mapType
        }
    })),
    on(SettingsActions.updateVideoInfoPanelMinimapZoomRequest, (state, { zoom }): State => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelMinimapZoom: zoom
        }
    })),
    on(SettingsActions.toggleSearchCategoryTitlesRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            searchShowCategoryTitles: !state.settings.searchShowCategoryTitles
        }
    })),
    on(SettingsActions.toggleSearchCategoryYearsRequest, (state): State => ({
        ...state,
        settings: {
            ...state.settings,
            searchShowCategoryYears: !state.settings.searchShowCategoryYears
        }
    })),
    on(SettingsActions.updateSearchCategoryMarginRequest, (state, { newMargin }): State => ({
        ...state,
        settings: {
            ...state.settings,
            searchCategoryMargin: newMargin
        }
    })),
    on(SettingsActions.updateSearchListTypeRequest, (state, { newType }): State => ({
        ...state,
        settings: {
            ...state.settings,
            searchViewMode: newType
        }
    })),
    on(SettingsActions.updateSearchListViewThumbnailSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            searchListViewThumbnailSize: newSize
        }
    })),
    on(SettingsActions.updateSearchThumbnailSizeRequest, (state, { newSize }): State => ({
        ...state,
        settings: {
            ...state.settings,
            searchThumbnailSize: newSize
        }
    }))
);
