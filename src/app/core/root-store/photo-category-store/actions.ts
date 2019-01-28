import { Action } from '@ngrx/store';

import { Category } from 'src/app/core/models/category.model';

export enum ActionTypes {
    LOAD_REQUEST = '[Photo Categories] Load Request',
    LOAD_FAILURE = '[Photo Categories] Load Failure',
    LOAD_SUCCESS = '[Photo Categories] Load Success',
    SET_CURRENT  = '[Photo Categories] Set Current'
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
    constructor(public payload: { categories: Category[] }) { }
}

export class SetCurrentAction implements Action {
    readonly type = ActionTypes.SET_CURRENT;
    constructor(public payload: { category: Category }) { }
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |
    SetCurrentAction;
