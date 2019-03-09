import { Action } from '@ngrx/store';

import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { VideoSize } from '../../models/video-size.model';

export enum ActionTypes {
    LOAD_REQUEST = '[Settings] Load Request',
    LOAD_FAILURE = '[Settings] Load Failure',
    LOAD_SUCCESS = '[Settings] Load Success',

    SAVE_REQUEST = '[Settings] Save Request',
    SAVE_FAILURE = '[Settings] Save Failure',
    SAVE_SUCCESS = '[Settings] Save Success',

    TOGGLE_CATEGORY_LIST_CATEGORY_TITLES = '[Settings] Toggle Category List Category Titles',
    UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE = '[Settings] Update Category List Thumbnail Size',

    TOGGLE_PHOTO_INFO_PANEL_RATINGS = '[Settings] Toggle Photo Info Panel Ratings',
    TOGGLE_PHOTO_INFO_PANEL_COMMENTS = '[Settings] Toggle Photo Info Panel Comments',
    TOGGLE_PHOTO_INFO_PANEL_EXIF = '[Settings] Toggle Photo Info Panel EXIF',
    TOGGLE_PHOTO_INFO_PANEL_EFFECTS = '[Settings] Toggle Photo Info Panel Effects',
    TOGGLE_PHOTO_INFO_PANEL_HISTOGRAM = '[Settings] Toggle Photo Info Panel Histogram',
    TOGGLE_PHOTO_INFO_PANEL_MINIMAP = '[Settings] Toggle Photo Info Panel Minimap',
    TOGGLE_PHOTO_INFO_PANEL_EXPANDED_STATE = '[Settings] Toggle Photo Info Panel Expanded State',
    UPDATE_PHOTO_INFO_PANEL_MINIMAP_ZOOM = '[Settings] Update Photo Info Panel Minimap Zoom',

    TOGGLE_PHOTO_LIST_SHOW_PHOTO_LIST = '[Settings] Toggle Photo List Show Photo List',
    TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Photo List Toolbar Expanded Sate',
    TOGGLE_PHOTO_LIST_FULLSCREEN_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Photo List Fullscreen Toolbar Expanded Sate',
    UPDATE_PHOTO_LIST_THUMBNAIL_SIZE = '[Settings] Update Photo List Thumbnail Size',
    TOGGLE_PHOTO_LIST_CATEGORY_BREADCRUMBS = '[Settings] Toggle Photo List Category Breadcrumbs',
    UPDATE_PHOTO_LIST_MAP_VIEW_ZOOM = '[Settings] Update Photo List Map View Zoom',

    TOGGLE_VIDEO_LIST_SHOW_VIDEO_LIST = '[Settings] Toggle Video List Show Video List',
    TOGGLE_VIDEO_LIST_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Video List Toolbar Expanded Sate',
    UPDATE_VIDEO_LIST_THUMBNAIL_SIZE = '[Settings] Update Video List Thumbnail Size',
    TOGGLE_VIDEO_LIST_CATEGORY_BREADCRUMBS = '[Settings] Toggle Video List Category Breadcrumbs',
    UPDATE_VIDEO_LIST_VIDEO_SIZE = '[Settings] Update Video List Video Size',

    TOGGLE_VIDEO_INFO_PANEL_RATINGS = '[Settings] Toggle Video Info Panel Ratings',
    TOGGLE_VIDEO_INFO_PANEL_COMMENTS = '[Settings] Toggle Video Info Panel Comments',
    TOGGLE_VIDEO_INFO_PANEL_MINIMAP = '[Settings] Toggle Video Info Panel Minimap',
    TOGGLE_VIDEO_INFO_PANEL_EXPANDED_STATE = '[Settings] Toggle Video Info Panel Expanded State',
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

export class TogglePhotoInfoPanelRatingsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_RATINGS;
}

export class TogglePhotoInfoPanelCommentsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_COMMENTS;
}

export class TogglePhotoInfoPanelExifRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXIF;
}

export class TogglePhotoInfoPanelEffectsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EFFECTS;
}

export class TogglePhotoInfoPanelHistogramRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_HISTOGRAM;
}

export class TogglePhotoInfoPanelMinimapRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_MINIMAP;
}

export class TogglePhotoInfoPanelExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_INFO_PANEL_EXPANDED_STATE;
}

export class UpdatePhotoInfoPanelMinimapZoomRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_INFO_PANEL_MINIMAP_ZOOM;
    constructor(public payload: { zoom: number }) {}
}

export class TogglePhotoListToolbarExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE;
}

export class TogglePhotoListFullscreenToolbarExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_FULLSCREEN_TOOLBAR_EXPANDED_STATE;
}

export class TogglePhotoListShowPhotoListRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_SHOW_PHOTO_LIST;
}

export class UpdatePhotoListThumbnailSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_LIST_THUMBNAIL_SIZE;
    constructor(public payload: { newSize: ThumbnailSize }) { }
}

export class TogglePhotoListCategoryBreadcrumbsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_CATEGORY_BREADCRUMBS;
}

export class UpdatePhotoListMapViewZoomRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_PHOTO_LIST_MAP_VIEW_ZOOM;
    constructor(public payload: { zoom: number }) { }
}

export class ToggleCategoryListCategoryTitlesRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_CATEGORY_LIST_CATEGORY_TITLES;
}

export class UpdateCategoryListThumbnailSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_CATEGORY_LIST_THUMBNAIL_SIZE;
    constructor(public payload: { newSize: ThumbnailSize }) { }
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

export class ToggleVideoListCategoryBreadcrumbsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_LIST_CATEGORY_BREADCRUMBS;
}

export class UpdateVideoListVideoSizeRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_VIDEO_LIST_VIDEO_SIZE;
    constructor(public payload: { newSize: VideoSize }) { }
}

export class ToggleVideoInfoPanelRatingsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_RATINGS;
}

export class ToggleVideoInfoPanelCommentsRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_COMMENTS;
}

export class ToggleVideoInfoPanelMinimapRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_MINIMAP;
}

export class ToggleVideoInfoPanelExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_VIDEO_INFO_PANEL_EXPANDED_STATE;
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
    UpdateCategoryListThumbnailSizeRequestAction |

    TogglePhotoInfoPanelExpandedStateRequestAction |
    TogglePhotoInfoPanelCommentsRequestAction |
    TogglePhotoInfoPanelEffectsRequestAction |
    TogglePhotoInfoPanelExifRequestAction |
    TogglePhotoInfoPanelHistogramRequestAction |
    TogglePhotoInfoPanelMinimapRequestAction |
    TogglePhotoInfoPanelRatingsRequestAction |
    UpdatePhotoInfoPanelMinimapZoomRequestAction |

    TogglePhotoListCategoryBreadcrumbsRequestAction |
    TogglePhotoListFullscreenToolbarExpandedStateRequestAction |
    TogglePhotoListShowPhotoListRequestAction |
    TogglePhotoListToolbarExpandedStateRequestAction |
    UpdatePhotoListThumbnailSizeRequestAction |
    UpdatePhotoListMapViewZoomRequestAction |

    ToggleVideoListCategoryBreadcrumbsRequestAction |
    ToggleVideoListShowVideoListRequestAction |
    ToggleVideoListToolbarExpandedStateRequestAction |
    UpdateVideoListThumbnailSizeRequestAction |
    UpdateVideoListVideoSizeRequestAction |

    ToggleVideoInfoPanelRatingsRequestAction |
    ToggleVideoInfoPanelCommentsRequestAction |
    ToggleVideoInfoPanelMinimapRequestAction |
    ToggleVideoInfoPanelExpandedStateRequestAction |
    UpdateVideoInfoPanelMinimapZoomRequestAction;
