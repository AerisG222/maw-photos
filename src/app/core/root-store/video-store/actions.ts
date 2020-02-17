import { createAction, props } from '@ngrx/store';

import { Video } from 'src/app/core/models/video.model';
import { Rating } from 'src/app/core/models/rating.model';
import { Comment } from 'src/app/core/models/comment.model';
import { GpsCoordinate } from '../../models/gps-coordinate.model';

export const clearRequest = createAction(
    '[Videos] Clear'
);

export const loadRequest = createAction(
    '[Videos] Load Request',
    props<{ categoryId: number }>()
);

export const loadFailure = createAction(
    '[Videos] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Videos] Load Success',
    props<{ videos: Video[] }>()
);

export const loadCommentsRequest = createAction(
    '[Videos] Load Comments Request',
    props<{ videoId: number }>()
);

export const loadCommentsFailure = createAction(
    '[Videos] Load Comments Failure',
    props<{ error: string }>()
);

export const loadCommentsSuccess = createAction(
    '[Videos] Load Comments Success',
    props<{ comments: Comment[] }>()
);

export const loadRatingRequest = createAction(
    '[Videos] Load Rating Request',
    props<{ videoId: number }>()
);

export const loadRatingFailure = createAction(
    '[Videos] Load Rating Failure',
    props<{ error: string }>()
);

export const loadRatingSuccess = createAction(
    '[Videos] Load Rating Success',
    props<{ rating: Rating }>()
);

export const addCommentRequest = createAction(
    '[Videos] Add Comment Request',
    props<{ videoId: number, comment: string }>()
);

export const addCommentFailure = createAction(
    '[Videos] Add Comment Failure',
    props<{ error: string }>()
);

export const addCommentSuccess = createAction(
    '[Videos] Add Comment Success',
    props<{ videoId: number }>()
);

export const rateVideoRequest = createAction(
    '[Videos] Rate Video Request',
    props<{ videoId: number, userRating: number }>()
);

export const rateVideoFailure = createAction(
    '[Videos] Rate Video Failure',
    props<{ error: string }>()
);

export const rateVideoSuccess = createAction(
    '[Videos] Rate Video Success',
    props<{ rating: Rating }>()
);

export const moveNextRequest = createAction(
    '[Videos] Move Next Request'
);

export const movePreviousRequest = createAction(
    '[Videos] Move Previous Request'
);

export const setCurrent = createAction(
    '[Videos] Set Current',
    props<{ video: Video }>()
);

export const loadSourceGpsCoordinateRequest = createAction(
    '[Videos] Load Source GPS Coordinate Request',
    props<{ videoId: number }>()
);

export const loadSourceGpsCoordinateFailure = createAction(
    '[Videos] Load Source GPS Coordinate Failure',
    props<{ error: string }>()
);

export const loadSourceGpsCoordinateSuccess = createAction(
    '[Videos] Load Source GPS Coordinate Success',
    props<{ gpsCoordinates: GpsCoordinate }>()
);

export const loadGpsCoordinateOverrideRequest = createAction(
    '[Videos] Load GPS Coordinate Override Request',
    props<{ videoId: number }>()
);

export const loadGpsCoordinateOverrideFailure = createAction(
    '[Videos] Load GPS Coordinate Override Failure',
    props<{ error: string }>()
);

export const loadGpsCoordinateOverrideSuccess = createAction(
    '[Videos] Load GPS Coordinate Override Success',
    props<{ gpsCoordinates: GpsCoordinate }>()
);

export const setGpsCoordinateOverrideRequest = createAction(
    '[Videos] Set GPS Coordinate Override Request',
    props<{ videoId: number, latLng: GpsCoordinate }>()
);

export const setGpsCoordinateOverrideFailure = createAction(
    '[Videos] Set GPS Coordinate Override Failure',
    props<{ error: string }>()
);

export const setGpsCoordinateOverrideSuccess = createAction(
    '[Videos] Set GPS Coordinate Override Success',
    props<{ videoId: number, latLng: GpsCoordinate }>()
);
