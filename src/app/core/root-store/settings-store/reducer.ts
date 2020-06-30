import { createReducer, on, Action } from '@ngrx/store';

import { initialState, State } from './state';
import * as SettingsActions from './actions';
import { CategoryMargin } from 'src/app/models/category-margin.model';

const reducer = createReducer(
    initialState,
    on(SettingsActions.updateMobileMarginsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListCategoryMargin: CategoryMargin.dense,
            searchCategoryMargin: CategoryMargin.dense
        }
    })),
    on(SettingsActions.loadRequest, state => ({
        ...state,
        error: undefined,
        isLoading: true
    })),
    on(SettingsActions.loadSuccess, (state, { settings }) => ({
        ...state,
        settings: { ...settings },
        error: undefined,
        isLoading: false
    })),
    on(SettingsActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(SettingsActions.saveRequest, state => ({
        ...state,
        error: undefined
    })),
    on(SettingsActions.saveFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(SettingsActions.saveSuccess, (state, { settings }) => ({
        ...state,
        settings: { ...settings },
        error: undefined
    })),
    on(SettingsActions.toggleCategoryListCategoryTitlesRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListShowCategoryTitles: !state.settings.categoryListShowCategoryTitles
        }
    })),
    on(SettingsActions.toggleCategoryListMissingGpsFilterRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListMissingGpsFilter: !state.settings.categoryListMissingGpsFilter
        }
    })),
    on(SettingsActions.updateCategoryListYearFilterRequest, (state, { yearFilter }) => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListYearFilter: yearFilter
        }
    })),
    on(SettingsActions.updateCategoryListCategoryFilterRequest, (state, { newFilter }) => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListCategoryFilter: newFilter
        }
    })),
    on(SettingsActions.updateCategoryListCategoryMarginRequest, (state, { newMargin }) => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListCategoryMargin: newMargin
        }
    })),
    on(SettingsActions.updateCategoryListListTypeRequest, (state, { newType }) => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListListType: newType
        }
    })),
    on(SettingsActions.updateCategoryListListViewThumbnailSizeRequest, (state, { newSize }) => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListListViewThumbnailSize: newSize
        }
    })),
    on(SettingsActions.updateCategoryListThumbnailSizeRequest, (state, { newSize }) => ({
        ...state,
        settings: {
            ...state.settings,
            categoryListThumbnailSize: newSize
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelCategoryTeaserChooserRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowCategoryTeaserChooser: !state.settings.photoInfoPanelShowCategoryTeaserChooser
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelCommentsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowComments: !state.settings.photoInfoPanelShowComments
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelEffectsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowEffects: !state.settings.photoInfoPanelShowEffects
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelExifRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowExif: !state.settings.photoInfoPanelShowExif
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelHistogramRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowHistogram: !state.settings.photoInfoPanelShowHistogram
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelRatingsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowRatings: !state.settings.photoInfoPanelShowRatings
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelMetadataEditorRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowMetadataEditor: !state.settings.photoInfoPanelShowMetadataEditor
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelMinimapRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelShowMinimap: !state.settings.photoInfoPanelShowMinimap
        }
    })),
    on(SettingsActions.togglePhotoInfoPanelExpandedStateRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelExpandedState: !state.settings.photoInfoPanelExpandedState
        }
    })),
    on(SettingsActions.updatePhotoInfoPanelMinimapMapTypeIdRequest, (state, { mapTypeId }) => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelMinimapMapTypeId: mapTypeId
        }
    })),
    on(SettingsActions.updatePhotoInfoPanelMinimapZoomRequest, (state, { zoom }) => ({
        ...state,
        settings: {
            ...state.settings,
            photoInfoPanelMinimapZoom: zoom
        }
    })),
    on(SettingsActions.togglePhotoListShowPhotoListRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoListShowPhotoList: !state.settings.photoListShowPhotoList
        }
    })),
    on(SettingsActions.updatePhotoListThumbnailSizeRequest, (state, { newSize }) => ({
        ...state,
        settings: {
            ...state.settings,
            photoListThumbnailSize: newSize
        }
    })),
    on(SettingsActions.togglePhotoListCategoryBreadcrumbsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            photoListShowCategoryBreadcrumbs: !state.settings.photoListShowCategoryBreadcrumbs
        }
    })),
    on(SettingsActions.updatePhotoListMapViewMapTypeIdRequest, (state, { mapTypeId }) => ({
        ...state,
        settings: {
            ...state.settings,
            photoListMapViewMapTypeId: mapTypeId
        }
    })),
    on(SettingsActions.updatePhotoListMapViewZoomRequest, (state, { zoom }) => ({
        ...state,
        settings: {
            ...state.settings,
            photoListMapViewZoom: zoom
        }
    })),
    on(SettingsActions.toggleVideoListShowVideoListRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoListShowVideoList: !state.settings.videoListShowVideoList
        }
    })),
    on(SettingsActions.updateVideoListThumbnailSizeRequest, (state, { newSize }) => ({
        ...state,
        settings: {
            ...state.settings,
            videoListThumbnailSize: newSize
        }
    })),
    on(SettingsActions.toggleVideoListCategoryBreadcrumbsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoListShowCategoryBreadcrumbs: !state.settings.videoListShowCategoryBreadcrumbs
        }
    })),
    on(SettingsActions.updateVideoListVideoSizeRequest, (state, { newSize }) => ({
        ...state,
        settings: {
            ...state.settings,
            videoListVideoSize: newSize
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelCategoryTeaserChooserRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowCategoryTeaserChooser: !state.settings.videoInfoPanelShowCategoryTeaserChooser
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelCommentsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowComments: !state.settings.videoInfoPanelShowComments
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelRatingsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowRatings: !state.settings.videoInfoPanelShowRatings
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelMetadataEditorRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowMetadataEditor: !state.settings.videoInfoPanelShowMetadataEditor
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelMinimapRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelShowMinimap: !state.settings.videoInfoPanelShowMinimap
        }
    })),
    on(SettingsActions.toggleVideoInfoPanelExpandedStateRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelExpandedState: !state.settings.videoInfoPanelExpandedState
        }
    })),
    on(SettingsActions.updateVideoInfoPanelMinimapMapTypeIdRequest, (state, { mapTypeId }) => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelMinimapMapTypeId: mapTypeId
        }
    })),
    on(SettingsActions.updateVideoInfoPanelMinimapZoomRequest, (state, { zoom }) => ({
        ...state,
        settings: {
            ...state.settings,
            videoInfoPanelMinimapZoom: zoom
        }
    })),
    on(SettingsActions.toggleSearchCategoryTitlesRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            searchShowCategoryTitles: !state.settings.searchShowCategoryTitles
        }
    })),
    on(SettingsActions.toggleSearchCategoryYearsRequest, state => ({
        ...state,
        settings: {
            ...state.settings,
            searchShowCategoryYears: !state.settings.searchShowCategoryYears
        }
    })),
    on(SettingsActions.updateSearchCategoryMarginRequest, (state, { newMargin }) => ({
        ...state,
        settings: {
            ...state.settings,
            searchCategoryMargin: newMargin
        }
    })),
    on(SettingsActions.updateSearchListTypeRequest, (state, { newType }) => ({
        ...state,
        settings: {
            ...state.settings,
            searchListType: newType
        }
    })),
    on(SettingsActions.updateSearchListViewThumbnailSizeRequest, (state, { newSize }) => ({
        ...state,
        settings: {
            ...state.settings,
            searchListViewThumbnailSize: newSize
        }
    })),
    on(SettingsActions.updateSearchThumbnailSizeRequest, (state, { newSize }) => ({
        ...state,
        settings: {
            ...state.settings,
            searchThumbnailSize: newSize
        }
    }))
);

export function settingsReducer(state: State | undefined, action: Action): State {
    return reducer(state, action);
}
