import { Action } from '@ngrx/store';

import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { VideoSize } from '../../models/video-size.model';
import { CategoryMargin } from '../../models/category-margin.model';
import { CategoryFilter } from '../../models/category-filter.model';
import { CategoryListType } from '../../models/category-list-type.model';

export enum ActionTypes {
    LOAD_REQUEST = '[Settings] Load Request',
    LOAD_FAILURE = '[Settings] Load Failure',
    LOAD_SUCCESS = '[Settings] Load Success',

    SAVE_REQUEST = '[Settings] Save Request',
    SAVE_FAILURE = '[Settings] Save Failure',
    SAVE_SUCCESS = '[Settings] Save Success',

    TOGGLE_CATEGORY_LIST_CATEGORY_TITLES = '[Settings] Toggle Category List Category Titles',
    TOGGLE_CATEGORY_LIST_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Category List Toolbar Expanded State',
    UPDATE_CATEGORY_LIST_YEAR_FILTER = '[Settings] Update Category List Year Filter',
    UPDATE_CATEGORY_LIST_CATEGORY_FILTER = '[Settings] Update Category List Category Filter',
    UPDATE_CATEGORY_LIST_CATEGORY_MARGIN = '[Settings] Update Category List Category Margin',
    UPDATE_CATEGORY_LIST_LIST_TYPE = '[Settings] Update Category List List Type',
    UPDATE_CATEGORY_LIST_LIST_VIEW_THUMBNAIL_SIZE = '[Settings] Update Category List List View Thumbnail Size',
    UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE = '[Settings] Update Category List Thumbnail Size',

    TOGGLE_PHOTO_INFO_PANEL_COMMENTS = '[Settings] Toggle Photo Info Panel Comments',
    TOGGLE_PHOTO_INFO_PANEL_EFFECTS = '[Settings] Toggle Photo Info Panel Effects',
    TOGGLE_PHOTO_INFO_PANEL_EXIF = '[Settings] Toggle Photo Info Panel EXIF',
    TOGGLE_PHOTO_INFO_PANEL_EXPANDED_STATE = '[Settings] Toggle Photo Info Panel Expanded State',
    TOGGLE_PHOTO_INFO_PANEL_HISTOGRAM = '[Settings] Toggle Photo Info Panel Histogram',
    TOGGLE_PHOTO_INFO_PANEL_MINIMAP = '[Settings] Toggle Photo Info Panel Minimap',
    TOGGLE_PHOTO_INFO_PANEL_RATINGS = '[Settings] Toggle Photo Info Panel Ratings',
    UPDATE_PHOTO_INFO_PANEL_MINIMAP_MAP_TYPE_ID = '[Settings] Update Photo Info Panel Minimap Map Type Id',
    UPDATE_PHOTO_INFO_PANEL_MINIMAP_ZOOM = '[Settings] Update Photo Info Panel Minimap Zoom',

    TOGGLE_PHOTO_LIST_CATEGORY_BREADCRUMBS = '[Settings] Toggle Photo List Category Breadcrumbs',
    TOGGLE_PHOTO_LIST_FULLSCREEN_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Photo List Fullscreen Toolbar Expanded Sate',
    TOGGLE_PHOTO_LIST_SHOW_PHOTO_LIST = '[Settings] Toggle Photo List Show Photo List',
    TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Photo List Toolbar Expanded Sate',
    UPDATE_PHOTO_LIST_MAP_VIEW_MAP_TYPE_ID = '[Settings] Update Photo List Map View Map Type Id',
    UPDATE_PHOTO_LIST_MAP_VIEW_ZOOM = '[Settings] Update Photo List Map View Zoom',
    UPDATE_PHOTO_LIST_THUMBNAIL_SIZE = '[Settings] Update Photo List Thumbnail Size',

    TOGGLE_VIDEO_LIST_CATEGORY_BREADCRUMBS = '[Settings] Toggle Video List Category Breadcrumbs',
    TOGGLE_VIDEO_LIST_SHOW_VIDEO_LIST = '[Settings] Toggle Video List Show Video List',
    TOGGLE_VIDEO_LIST_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Video List Toolbar Expanded Sate',
    UPDATE_VIDEO_LIST_THUMBNAIL_SIZE = '[Settings] Update Video List Thumbnail Size',
    UPDATE_VIDEO_LIST_VIDEO_SIZE = '[Settings] Update Video List Video Size',

    TOGGLE_VIDEO_INFO_PANEL_COMMENTS = '[Settings] Toggle Video Info Panel Comments',
    TOGGLE_VIDEO_INFO_PANEL_EXPANDED_STATE = '[Settings] Toggle Video Info Panel Expanded State',
    TOGGLE_VIDEO_INFO_PANEL_MINIMAP = '[Settings] Toggle Video Info Panel Minimap',
    TOGGLE_VIDEO_INFO_PANEL_RATINGS = '[Settings] Toggle Video Info Panel Ratings',
    UPDATE_VIDEO_INFO_PANEL_MINIMAP_MAP_TYPE_ID = '[Settings] Update Video Info Panel Minimap Map Type Id',
    UPDATE_VIDEO_INFO_PANEL_MINIMAP_ZOOM = '[Settings] Update Video Info Panel Minimap Zoom'
}

export class LoadRequestAction implements Action {
    readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
    readonly type = ActionTypes.LOAD_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: { settings: Settings }) { }
}

export class SaveRequestAction implements Action {
    readonly type = ActionTypes.SAVE_REQUEST;
    constructor(public payload: { settings: Settings }) { }
}

export class SaveSuccessAction implements Action {
    readonly type = ActionTypes.SAVE_SUCCESS;
    constructor(public payload: { settings: Settings }) { }
}

export class SaveFailureAction implements Action {
    readonly type = ActionTypes.SAVE_FAILURE;
    constructor(public payload: {error: string}) { }
}

export class ToggleCategoryListCategoryTitlesRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_CATEGORY_LIST_CATEGORY_TITLES;
}

export class ToggleCategoryListToolbarExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_CATEGORY_LIST_TOOLBAR_EXPANDED_STATE;
}

export class UpdateCategoryListYearFilterRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_CATEGORY_LIST_YEAR_FILTER;
    constructor(public payload: { yearFilter: string | number }) { }
}

export class UpdateCategoryListCategoryFilterRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_CATEGORY_LIST_CATEGORY_FILTER;
    constructor(public payload: { newFilter: CategoryFilter }) { }
}

export class UpdateCategoryListCategoryMarginRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_CATEGORY_LIST_CATEGORY_MARGIN;
    constructor(public payload: { newMargin: CategoryMargin }) { }
}

export class UpdateCategoryListListTypeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_CATEGORY_LIST_LIST_TYPE;
    constructor(public payload: { newType: CategoryListType }) { }
}

export class UpdateCategoryListListViewThumbnailSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_CATEGORY_LIST_LIST_VIEW_THUMBNAIL_SIZE;
    constructor(public payload: { newSize: ThumbnailSize }) { }
}

export class UpdateCategoryListThumbnailSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE;
    constructor(public payload: { newSize: ThumbnailSize }) { }
}

export class TogglePhotoInfoPanelCommentsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_COMMENTS;
}

export class TogglePhotoInfoPanelEffectsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EFFECTS;
}

export class TogglePhotoInfoPanelExifRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXIF;
}

export class TogglePhotoInfoPanelExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXPANDED_STATE;
}

export class TogglePhotoInfoPanelHistogramRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_HISTOGRAM;
}

export class TogglePhotoInfoPanelMinimapRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_MINIMAP;
}

export class TogglePhotoInfoPanelRatingsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_RATINGS;
}

export class UpdatePhotoInfoPanelMinimapMapTypeIdRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_INFO_PANEL_MINIMAP_MAP_TYPE_ID;
    constructor(public payload: { mapTypeId: string }) {}
}

export class UpdatePhotoInfoPanelMinimapZoomRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_INFO_PANEL_MINIMAP_ZOOM;
    constructor(public payload: { zoom: number }) {}
}

export class TogglePhotoListCategoryBreadcrumbsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_CATEGORY_BREADCRUMBS;
}

export class TogglePhotoListFullscreenToolbarExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_FULLSCREEN_TOOLBAR_EXPANDED_STATE;
}

export class TogglePhotoListShowPhotoListRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_SHOW_PHOTO_LIST;
}

export class TogglePhotoListToolbarExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE;
}

export class UpdatePhotoListMapViewMapTypeIdRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_LIST_MAP_VIEW_MAP_TYPE_ID;
    constructor(public payload: { mapTypeId: string }) {}
}

export class UpdatePhotoListMapViewZoomRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_LIST_MAP_VIEW_ZOOM;
    constructor(public payload: { zoom: number }) { }
}

export class UpdatePhotoListThumbnailSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_LIST_THUMBNAIL_SIZE;
    constructor(public payload: { newSize: ThumbnailSize }) { }
}

export class ToggleVideoListCategoryBreadcrumbsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_LIST_CATEGORY_BREADCRUMBS;
}

export class ToggleVideoListShowVideoListRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_LIST_SHOW_VIDEO_LIST;
}

export class ToggleVideoListToolbarExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_LIST_TOOLBAR_EXPANDED_STATE;
}

export class UpdateVideoListThumbnailSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_VIDEO_LIST_THUMBNAIL_SIZE;
    constructor(public payload: { newSize: ThumbnailSize }) { }
}

export class UpdateVideoListVideoSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_VIDEO_LIST_VIDEO_SIZE;
    constructor(public payload: { newSize: VideoSize }) { }
}

export class ToggleVideoInfoPanelCommentsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_COMMENTS;
}

export class ToggleVideoInfoPanelExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_EXPANDED_STATE;
}

export class ToggleVideoInfoPanelMinimapRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_MINIMAP;
}

export class ToggleVideoInfoPanelRatingsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_RATINGS;
}

export class UpdateVideoInfoPanelMinimapMapTypeIdRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_VIDEO_INFO_PANEL_MINIMAP_MAP_TYPE_ID;
    constructor(public payload: { mapTypeId: string }) {}
}

export class UpdateVideoInfoPanelMinimapZoomRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_VIDEO_INFO_PANEL_MINIMAP_ZOOM;
    constructor(public payload: { zoom: number }) {}
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |

    SaveRequestAction |
    SaveFailureAction |
    SaveSuccessAction |

    ToggleCategoryListCategoryTitlesRequestAction |
    ToggleCategoryListToolbarExpandedStateRequestAction |
    UpdateCategoryListYearFilterRequestAction |
    UpdateCategoryListCategoryFilterRequestAction |
    UpdateCategoryListCategoryMarginRequestAction |
    UpdateCategoryListListTypeRequestAction |
    UpdateCategoryListThumbnailSizeRequestAction |
    UpdateCategoryListListViewThumbnailSizeRequestAction |

    TogglePhotoInfoPanelCommentsRequestAction |
    TogglePhotoInfoPanelEffectsRequestAction |
    TogglePhotoInfoPanelExifRequestAction |
    TogglePhotoInfoPanelExpandedStateRequestAction |
    TogglePhotoInfoPanelHistogramRequestAction |
    TogglePhotoInfoPanelMinimapRequestAction |
    UpdatePhotoInfoPanelMinimapMapTypeIdRequestAction |
    UpdatePhotoInfoPanelMinimapZoomRequestAction |
    TogglePhotoInfoPanelRatingsRequestAction |

    TogglePhotoListCategoryBreadcrumbsRequestAction |
    TogglePhotoListFullscreenToolbarExpandedStateRequestAction |
    UpdatePhotoListMapViewMapTypeIdRequestAction |
    UpdatePhotoListMapViewZoomRequestAction |
    TogglePhotoListShowPhotoListRequestAction |
    UpdatePhotoListThumbnailSizeRequestAction |
    TogglePhotoListToolbarExpandedStateRequestAction |

    ToggleVideoListCategoryBreadcrumbsRequestAction |
    ToggleVideoListShowVideoListRequestAction |
    UpdateVideoListThumbnailSizeRequestAction |
    ToggleVideoListToolbarExpandedStateRequestAction |
    UpdateVideoListVideoSizeRequestAction |

    ToggleVideoInfoPanelCommentsRequestAction |
    ToggleVideoInfoPanelExpandedStateRequestAction |
    ToggleVideoInfoPanelMinimapRequestAction |
    UpdateVideoInfoPanelMinimapMapTypeIdRequestAction |
    UpdateVideoInfoPanelMinimapZoomRequestAction |
    ToggleVideoInfoPanelRatingsRequestAction;
