import { Action } from '@ngrx/store';

import { Photo } from 'src/app/core/models/photo.model';

export enum ActionTypes {
    CLEAR_REQUEST = '[Photos] Clear',
    LOAD_REQUEST = '[Photos] Load Request',
    LOAD_FAILURE = '[Photos] Load Failure',
    LOAD_SUCCESS = '[Photos] Load Success',
    SET_CURRENT  = '[Photos] Set Current',
    LOAD_RANDOM_REQUEST = '[Photos Load Random Request',
    LOAD_RANDOM_FAILURE = '[Photos Load Random Failure',
    LOAD_RANDOM_SUCCESS = '[Photos Load Random Success',
}

export class ClearRequestAction implements Action {
    readonly type = ActionTypes.CLEAR_REQUEST;
}

export class LoadRequestAction implements Action {
    readonly type = ActionTypes.LOAD_REQUEST;
    constructor(public payload: { categoryId: number }) {}
}

export class LoadFailureAction implements Action {
    readonly type = ActionTypes.LOAD_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: { photos: Photo[] }) { }
}

export class SetCurrentAction implements Action {
    readonly type = ActionTypes.SET_CURRENT;
    constructor(public payload: { photo: Photo }) { }
}

export class LoadRandomRequestAction implements Action {
    readonly type = ActionTypes.LOAD_RANDOM_REQUEST;
}

export class LoadRandomFailureAction implements Action {
    readonly type = ActionTypes.LOAD_RANDOM_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadRandomSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_RANDOM_SUCCESS;
    constructor(public payload: { photo: Photo }) { }
}

export type Actions =
    ClearRequestAction |
    LoadRandomRequestAction |
    LoadRandomFailureAction |
    LoadRandomSuccessAction |
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |
    SetCurrentAction;
