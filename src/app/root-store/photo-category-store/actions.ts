import { Action } from '@ngrx/store';

import { ICategory } from 'src/app/models/icategory.model';

export enum ActionTypes {
    LOAD_REQUEST = '[Photo Categories] Load Request',
    LOAD_FAILURE = '[Photo Categories] Load Failure',
    LOAD_SUCCESS = '[Photo Categories] Load Success'
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
    constructor(public payload: { categories: ICategory[] }) { }
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction;
