import { Action } from '@ngrx/store';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';

export enum ActionTypes {
    LOAD_REQUEST = '[Photo Categories] Load Request',
    LOAD_FAILURE = '[Photo Categories] Load Failure',
    LOAD_SUCCESS = '[Photo Categories] Load Success',

    SET_CURRENT  = '[Photo Categories] Set Current',
    SET_CURRENT_BY_ID = '[Photo Categories] Set Current By Id'
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
    constructor(public payload: { categories: PhotoCategory[] }) { }
}

export class SetCurrentAction implements Action {
    readonly type = ActionTypes.SET_CURRENT;
    constructor(public payload: { category: PhotoCategory }) { }
}

export class SetCurrentByIdAction implements Action {
    readonly type = ActionTypes.SET_CURRENT_BY_ID;
    constructor(public payload: { categoryId: number }) { }
}

export type Actions =
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |

    SetCurrentAction |
    SetCurrentByIdAction;
