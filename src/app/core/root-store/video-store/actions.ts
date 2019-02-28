import { Action } from '@ngrx/store';

import { Video } from 'src/app/core/models/video.model';
import { Rating } from 'src/app/core/models/rating.model';
import { Comment } from 'src/app/core/models/comment.model';

export enum ActionTypes {
    CLEAR_REQUEST = '[Videos] Clear',
    LOAD_REQUEST = '[Videos] Load Request',
    LOAD_FAILURE = '[Videos] Load Failure',
    LOAD_SUCCESS = '[Videos] Load Success',
    SET_CURRENT  = '[Videos] Set Current',
    LOAD_COMMENTS_REQUEST = '[Videos] Load Comments Request',
    LOAD_COMMENTS_FAILURE = '[Videos] Load Comments Failure',
    LOAD_COMMENTS_SUCCESS = '[Videos] Load Comments Success',
    LOAD_RATING_REQUEST = '[Videos] Load Rating Request',
    LOAD_RATING_FAILURE = '[Videos] Load Rating Failure',
    LOAD_RATING_SUCCESS = '[Videos] Load Rating Success',
    RATE_VIDEO_REQUEST = '[Videos] Rate Video Request',
    RATE_VIDEO_FAILURE = '[Videos] Rate Video Failure',
    RATE_VIDEO_SUCCESS = '[Videos] Rate Video Success',
    ADD_COMMENT_REQUEST = '[Videos] Add Comment Request',
    ADD_COMMENT_FAILURE = '[Videos] Add Comment Failure',
    ADD_COMMENT_SUCCESS = '[Videos] Add Comment Success',
    MOVE_NEXT_REQUEST = '[Videos] Move Next Request',
    MOVE_PREVIOUS_REQUEST = '[Videos] Move Previous Request'
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
    constructor(public payload: { videos: Video[] }) { }
}

export class SetCurrentAction implements Action {
    readonly type = ActionTypes.SET_CURRENT;
    constructor(public payload: { video: Video }) { }
}

export class RateVideoRequestAction implements Action {
    readonly type = ActionTypes.RATE_VIDEO_REQUEST;
    constructor(public payload: { videoId: number, userRating: number }) { }
}

export class RateVideoFailureAction implements Action {
    readonly type = ActionTypes.RATE_VIDEO_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class RateVideoSuccessAction implements Action {
    readonly type = ActionTypes.RATE_VIDEO_SUCCESS;
    constructor(public payload: { averageRating: number }) { }
}

export class MoveNextRequestAction implements Action {
    readonly type = ActionTypes.MOVE_NEXT_REQUEST;
}

export class MovePreviousRequestAction implements Action {
    readonly type = ActionTypes.MOVE_PREVIOUS_REQUEST;
}

export class LoadRatingRequestAction implements Action {
    readonly type = ActionTypes.LOAD_RATING_REQUEST;
    constructor(public payload: { videoId: number }) { }
}

export class LoadRatingFailureAction implements Action {
    readonly type = ActionTypes.LOAD_RATING_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadRatingSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_RATING_SUCCESS;
    constructor(public payload: { rating: Rating }) { }
}

export class LoadCommentsRequestAction implements Action {
    readonly type = ActionTypes.LOAD_COMMENTS_REQUEST;
    constructor(public payload: { videoId: number }) { }
}

export class LoadCommentsFailureAction implements Action {
    readonly type = ActionTypes.LOAD_COMMENTS_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadCommentsSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_COMMENTS_SUCCESS;
    constructor(public payload: { comments: Comment[] }) { }
}

export class AddCommentRequestAction implements Action {
    readonly type = ActionTypes.ADD_COMMENT_REQUEST;
    constructor(public payload: { videoId: number, comment: string }) { }
}

export class AddCommentFailureAction implements Action {
    readonly type = ActionTypes.ADD_COMMENT_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class AddCommentSuccessAction implements Action {
    readonly type = ActionTypes.ADD_COMMENT_SUCCESS;
    constructor(public payload: { videoId: number }) { }
}

export type Actions =
    ClearRequestAction |
    LoadCommentsRequestAction |
    LoadCommentsFailureAction |
    LoadCommentsSuccessAction |
    LoadRatingRequestAction |
    LoadRatingFailureAction |
    LoadRatingSuccessAction |
    LoadRequestAction |
    LoadFailureAction |
    LoadSuccessAction |
    SetCurrentAction |
    MoveNextRequestAction |
    MovePreviousRequestAction |
    RateVideoRequestAction |
    RateVideoFailureAction |
    RateVideoSuccessAction |
    AddCommentRequestAction |
    AddCommentFailureAction |
    AddCommentSuccessAction;
