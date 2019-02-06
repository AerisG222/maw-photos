import { Action } from '@ngrx/store';

import { Settings } from 'src/app/core/models/settings.model';

export enum ActionTypes {
    LOAD_REQUEST = '[Settings] Load Request',
    LOAD_FAILURE = '[Settings] Load Failure',
    LOAD_SUCCESS = '[Settings] Load Success',

    SAVE_REQUEST = '[Settings] Save Request',
    SAVE_FAILURE = '[Settings] Save Failure',
    SAVE_SUCCESS = '[Settings] Save Success',

    TOGGLE_PHOTO_INFO_PANEL_RATINGS = '[Settings] Toggle Photo Info Panel Ratings',
    TOGGLE_PHOTO_INFO_PANEL_COMMENTS = '[Settings] Toggle Photo Info Panel Comments',
    TOGGLE_PHOTO_INFO_PANEL_EXIF = '[Settings] Toggle Photo Info Panel EXIF',
    TOGGLE_PHOTO_INFO_PANEL_EFFECTS = '[Settings] Toggle Photo Info Panel Effects',

    TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE = '[Settings] Toggle Photo List Toolbar Expanded Sate'
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

export class TogglePhotoListToolbarExpandedStateRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_PHOTO_LIST_TOOLBAR_EXPANDED_STATE;
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |
    SaveRequestAction |
    SaveFailureAction |
    SaveSuccessAction |
    TogglePhotoInfoPanelRatingsRequestAction |
    TogglePhotoInfoPanelCommentsRequestAction |
    TogglePhotoInfoPanelExifRequestAction |
    TogglePhotoInfoPanelEffectsRequestAction |
    TogglePhotoListToolbarExpandedStateRequestAction;
