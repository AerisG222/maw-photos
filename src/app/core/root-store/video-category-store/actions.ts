import { Action } from '@ngrx/store';

import { VideoCategory } from 'src/app/core/models/video-category.model';

export enum ActionTypes {
    LOAD_REQUEST = '[Video Categories] Load Request',
    LOAD_FAILURE = '[Video Categories] Load Failure',
    LOAD_SUCCESS = '[Video Categories] Load Success',
    SET_CURRENT  = '[Video Categories] Set Current'
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
    constructor(public payload: { categories: VideoCategory[] }) { }
}

export class SetCurrentAction implements Action {
    readonly type = ActionTypes.SET_CURRENT;
    constructor(public payload: { category: VideoCategory }) { }
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |
    SetCurrentAction;
