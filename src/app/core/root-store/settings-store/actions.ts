import { createAction, props } from '@ngrx/store';

import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { VideoSize } from '../../models/video-size.model';
import { CategoryMargin } from '../../models/category-margin.model';
import { CategoryFilter } from '../../models/category-filter.model';
import { CategoryListType } from '../../models/category-list-type.model';

export const loadRequest = createAction(
    '[Settings] Load Request'
);

export const loadFailure = createAction(
    '[Settings] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Settings] Load Success',
    props<{ settings: Settings }>()
);

export const saveRequest = createAction(
    '[Settings] Save Request',
    props<{ settings: Settings }>()
);

export const saveSuccess = createAction(
    '[Settings] Save Success',
    props<{ settings: Settings }>()
);

export const saveFailure = createAction(
    '[Settings] Save Failure',
    props<{ error: string }>()
);

export const toggleCategoryListCategoryTitlesRequest = createAction(
    '[Settings] Toggle Category List Category Titles'
);

export const updateCategoryListYearFilterRequest = createAction(
    '[Settings] Update Category List Year Filter',
    props<{ yearFilter: string | number }>()
);

export const updateCategoryListCategoryFilterRequest = createAction(
    '[Settings] Update Category List Category Filter',
    props<{ newFilter: CategoryFilter }>()
);

export const updateCategoryListCategoryMarginRequest = createAction(
    '[Settings] Update Category List Category Margin',
    props<{ newMargin: CategoryMargin }>()
);

export const updateCategoryListListTypeRequest = createAction(
    '[Settings] Update Category List List Type',
    props<{ newType: CategoryListType }>()
);

export const updateCategoryListListViewThumbnailSizeRequest = createAction(
    '[Settings] Update Category List List View Thumbnail Size',
    props<{ newSize: ThumbnailSize }>()
);

export const updateCategoryListThumbnailSizeRequest = createAction(
    '[Settings] Update Category List Thumbnail Size',
    props<{ newSize: ThumbnailSize }>()
);

export const togglePhotoInfoPanelCommentsRequest = createAction(
    '[Settings] Toggle Photo Info Panel Comments'
);

export const togglePhotoInfoPanelEffectsRequest = createAction(
    '[Settings] Toggle Photo Info Panel Effects'
);

export const togglePhotoInfoPanelExifRequest = createAction(
    '[Settings] Toggle Photo Info Panel EXIF'
);

export const togglePhotoInfoPanelExpandedStateRequest = createAction(
    '[Settings] Toggle Photo Info Panel Expanded State'
);

export const togglePhotoInfoPanelHistogramRequest = createAction(
    '[Settings] Toggle Photo Info Panel Histogram'
);

export const togglePhotoInfoPanelMinimapRequest = createAction(
    '[Settings] Toggle Photo Info Panel Minimap'
);

export const togglePhotoInfoPanelRatingsRequest = createAction(
    '[Settings] Toggle Photo Info Panel Ratings'
);

export const updatePhotoInfoPanelMinimapMapTypeIdRequest = createAction(
    '[Settings] Update Photo Info Panel Minimap Map Type Id',
    props<{ mapTypeId: string }>()
);

export const updatePhotoInfoPanelMinimapZoomRequest = createAction(
    '[Settings] Update Photo Info Panel Minimap Zoom',
    props<{ zoom: number }>()
);

export const togglePhotoListCategoryBreadcrumbsRequest = createAction(
    '[Settings] Toggle Photo List Category Breadcrumbs'
);

export const togglePhotoListShowPhotoListRequest = createAction(
    '[Settings] Toggle Photo List Show Photo List'
);

export const updatePhotoListMapViewMapTypeIdRequest = createAction(
    '[Settings] Update Photo List Map View Map Type Id',
    props<{ mapTypeId: string }>()
);

export const updatePhotoListMapViewZoomRequest = createAction(
    '[Settings] Update Photo List Map View Zoom',
    props<{ zoom: number }>()
);

export const updatePhotoListThumbnailSizeRequest = createAction(
    '[Settings] Update Photo List Thumbnail Size',
    props<{ newSize: ThumbnailSize }>()
);

export const toggleVideoListCategoryBreadcrumbsRequest = createAction(
    '[Settings] Toggle Video List Category Breadcrumbs'
);

export const toggleVideoListShowVideoListRequest = createAction(
    '[Settings] Toggle Video List Show Video List'
);

export const updateVideoListThumbnailSizeRequest = createAction(
    '[Settings] Update Video List Thumbnail Size',
    props<{ newSize: ThumbnailSize }>()
);

export const updateVideoListVideoSizeRequest = createAction(
    '[Settings] Update Video List Video Size',
    props<{ newSize: VideoSize }>()
);

export const toggleVideoInfoPanelCommentsRequest = createAction(
    '[Settings] Toggle Video Info Panel Comments'
);

export const toggleVideoInfoPanelExpandedStateRequest = createAction(
    '[Settings] Toggle Video Info Panel Expanded State'
);

export const toggleVideoInfoPanelMinimapRequest = createAction(
    '[Settings] Toggle Video Info Panel Minimap'
);

export const toggleVideoInfoPanelRatingsRequest = createAction(
    '[Settings] Toggle Video Info Panel Ratings'
);

export const updateVideoInfoPanelMinimapMapTypeIdRequest = createAction(
    '[Settings] Update Video Info Panel Minimap Map Type Id',
    props<{ mapTypeId: string }>()
);

export const updateVideoInfoPanelMinimapZoomRequest = createAction(
    '[Settings] Update Video Info Panel Minimap Zoom',
    props<{ zoom: number }>()
);

export const toggleSearchCategoryTitlesRequest = createAction(
    '[Settings] Toggle Search Category Titles'
);

export const toggleSearchCategoryYearsRequest = createAction(
    '[Settings] Toggle Search Category Years'
);

export const updateSearchCategoryMarginRequest = createAction(
    '[Settings] Update Search Category Margin',
    props<{ newMargin: CategoryMargin }>()
);

export const updateSearchListTypeRequest = createAction(
    '[Settings] Update Search List Type',
    props<{ newType: CategoryListType }>()
);

export const updateSearchListViewThumbnailSizeRequest = createAction(
    '[Settings] Update Search List View Thumbnail Size',
    props<{ newSize: ThumbnailSize }>()
);

export const updateSearchThumbnailSizeRequest = createAction(
    '[Settings] Update Search Thumbnail Size',
    props<{ newSize: ThumbnailSize }>()
);
