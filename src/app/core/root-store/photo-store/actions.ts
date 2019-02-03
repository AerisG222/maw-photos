import { Action } from '@ngrx/store';

import { Photo } from 'src/app/core/models/photo.model';
import { Rating } from '../../models/rating.model';
import { PhotoComment } from '../../models/photo-comment.model';
import { ExifDetail } from '../../models/exif-detail.model';
import { PhotoRotation } from '../../models/photo-rotation.model';
import { PhotoEffects } from '../../models/photo-effects.model';

export enum ActionTypes {
    CLEAR_REQUEST = '[Photos] Clear',
    LOAD_REQUEST = '[Photos] Load Request',
    LOAD_FAILURE = '[Photos] Load Failure',
    LOAD_SUCCESS = '[Photos] Load Success',
    SET_CURRENT  = '[Photos] Set Current',
    LOAD_COMMENTS_REQUEST = '[Photos] Load Comments Request',
    LOAD_COMMENTS_FAILURE = '[Photos] Load Comments Failure',
    LOAD_COMMENTS_SUCCESS = '[Photos] Load Comments Success',
    LOAD_RANDOM_REQUEST = '[Photos] Load Random Request',
    LOAD_RANDOM_FAILURE = '[Photos] Load Random Failure',
    LOAD_RANDOM_SUCCESS = '[Photos] Load Random Success',
    LOAD_RATING_REQUEST = '[Photos] Load Rating Request',
    LOAD_RATING_FAILURE = '[Photos] Load Rating Failure',
    LOAD_RATING_SUCCESS = '[Photos] Load Rating Success',
    RATE_PHOTO_REQUEST = '[Photos] Rate Photo Request',
    RATE_PHOTO_FAILURE = '[Photos] Rate Photo Failure',
    RATE_PHOTO_SUCCESS = '[Photos] Rate Photo Success',
    ADD_COMMENT_REQUEST = '[Photos] Add Comment Request',
    ADD_COMMENT_FAILURE = '[Photos] Add Comment Failure',
    ADD_COMMENT_SUCCESS = '[Photos] Add Comment Success',
    LOAD_EXIF_REQUEST = '[Photos] Load Exif Request',
    LOAD_EXIF_FAILURE = '[Photos] Load Exif Failure',
    LOAD_EXIF_SUCCESS = '[Photos] Load Exif Success',
    MOVE_NEXT_REQUEST = '[Photos] Move Next Request',
    MOVE_PREVIOUS_REQUEST = '[Photos] Move Previous Request',
    ROTATE_CLOCKWISE_REQUEST = '[Photos] Rotate Clockwise Request',
    ROTATE_COUNTER_CLOCKWISE_REQUEST = '[Photos] Rotate Counter Clockwise Request',
    ROTATE_SUCCESS = '[Photos] Rotate Success',
    RESET_EFFECTS_REQUEST = '[Photos] Reset Effects Request',
    UPDATE_EFFECTS_REQUEST = '[Photos] Update Effects Request',
    TOGGLE_SLIDESHOW_REQUEST = '[Photos] Toggle Slideshow Request',
    START_SLIDESHOW_REQUEST = '[Photos] Start Slideshow Request',
    STOP_SLIDESHOW_REQUEST = '[Photos] Stop Slideshow Request'
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

export class RatePhotoRequestAction implements Action {
    readonly type = ActionTypes.RATE_PHOTO_REQUEST;
    constructor(public payload: { photoId: number, userRating: number }) { }
}

export class RatePhotoFailureAction implements Action {
    readonly type = ActionTypes.RATE_PHOTO_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class RatePhotoSuccessAction implements Action {
    readonly type = ActionTypes.RATE_PHOTO_SUCCESS;
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
    constructor(public payload: { photoId: number }) { }
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
    constructor(public payload: { photoId: number }) { }
}

export class LoadCommentsFailureAction implements Action {
    readonly type = ActionTypes.LOAD_COMMENTS_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadCommentsSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_COMMENTS_SUCCESS;
    constructor(public payload: { comments: PhotoComment[] }) { }
}

export class AddCommentRequestAction implements Action {
    readonly type = ActionTypes.ADD_COMMENT_REQUEST;
    constructor(public payload: { photoId: number, comment: string }) { }
}

export class AddCommentFailureAction implements Action {
    readonly type = ActionTypes.ADD_COMMENT_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class AddCommentSuccessAction implements Action {
    readonly type = ActionTypes.ADD_COMMENT_SUCCESS;
    constructor(public payload: { photoId: number }) { }
}

export class LoadExifRequestAction implements Action {
    readonly type = ActionTypes.LOAD_EXIF_REQUEST;
    constructor(public payload: { photoId: number }) { }
}

export class LoadExifFailureAction implements Action {
    readonly type = ActionTypes.LOAD_EXIF_FAILURE;
    constructor(public payload: { error: string }) { }
}

export class LoadExifSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_EXIF_SUCCESS;
    constructor(public payload: { exif: ExifDetail }) { }
}

export class RotateClockwiseRequestAction implements Action {
    readonly type = ActionTypes.ROTATE_CLOCKWISE_REQUEST;
}

export class RotateCounterClockwiseRequestAction implements Action {
    readonly type = ActionTypes.ROTATE_COUNTER_CLOCKWISE_REQUEST;
}

export class RotateSuccessAction implements Action {
    readonly type = ActionTypes.ROTATE_SUCCESS;
    constructor(public payload: { newRotation: PhotoRotation }) { }
}

export class ResetEffectsRequestAction implements Action {
    readonly type = ActionTypes.RESET_EFFECTS_REQUEST;
}

export class UpdateEffectsRequestAction implements Action {
    readonly type = ActionTypes.UPDATE_EFFECTS_REQUEST;
    constructor(public payload: { effects: PhotoEffects }) { }
}

export class ToggleSlideshowRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_SLIDESHOW_REQUEST;
}

export class StartSlideshowRequestAction implements Action {
    readonly type = ActionTypes.START_SLIDESHOW_REQUEST;
}

export class StopSlideshowRequestAction implements Action {
    readonly type = ActionTypes.STOP_SLIDESHOW_REQUEST;
}

export type Actions =
    ClearRequestAction |
    LoadCommentsRequestAction |
    LoadCommentsFailureAction |
    LoadCommentsSuccessAction |
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
    MovePreviousRequestAction |
    RatePhotoRequestAction |
    RatePhotoFailureAction |
    RatePhotoSuccessAction |
    AddCommentRequestAction |
    AddCommentFailureAction |
    AddCommentSuccessAction |
    LoadExifRequestAction |
    LoadExifFailureAction |
    LoadExifSuccessAction |
    RotateClockwiseRequestAction |
    RotateCounterClockwiseRequestAction |
    RotateSuccessAction |
    ResetEffectsRequestAction |
    UpdateEffectsRequestAction |
    ToggleSlideshowRequestAction |
    StartSlideshowRequestAction |
    StopSlideshowRequestAction;
