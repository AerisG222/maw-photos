import { Action } from '@ngrx/store';

import { Photo } from 'src/app/core/models/photo.model';
import { Rating } from '../../models/rating.model';

export enum ActionTypes {
    CLEAR_REQUEST = '[Photos] Clear',
    LOAD_REQUEST = '[Photos] Load Request',
    LOAD_FAILURE = '[Photos] Load Failure',
    LOAD_SUCCESS = '[Photos] Load Success',
    SET_CURRENT  = '[Photos] Set Current',
    LOAD_RANDOM_REQUEST = '[Photos Load Random Request',
    LOAD_RANDOM_FAILURE = '[Photos Load Random Failure',
    LOAD_RANDOM_SUCCESS = '[Photos Load Random Success',
    LOAD_RATING_REQUEST = '[Photos Load Rating Request',
    LOAD_RATING_FAILURE = '[Photos Load Rating Failure',
    LOAD_RATING_SUCCESS = '[Photos Load Rating Success',
    MOVE_NEXT_REQUEST = '[Photos] Move Next Request',
    MOVE_PREVIOUS_REQUEST = '[Photos] Move Previous Request'
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

export class LoadRatingRequestAction implements Action {
    readonly type = ActionTypes.LOAD_RATING_REQUEST;
    constructor(public payload: { id: number }) { }
}

export class LoadRatingFailureAction implements Action {
    readonly type = ActionTypes.LOAD_RATING_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadRatingSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_RATING_SUCCESS;
    constructor(public payload: { rating: Rating }) { }
}

export class MoveNextRequestAction implements Action {
    readonly type = ActionTypes.MOVE_NEXT_REQUEST;
}

export class MovePreviousRequestAction implements Action {
    readonly type = ActionTypes.MOVE_PREVIOUS_REQUEST;
}

export type Actions =
    ClearRequestAction |
    LoadRandomRequestAction |
    LoadRandomFailureAction |
    LoadRandomSuccessAction |
    LoadRatingRequestAction |
    LoadRatingFailureAction |
    LoadRatingSuccessAction |
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |
    SetCurrentAction |
    MoveNextRequestAction |
    MovePreviousRequestAction;
