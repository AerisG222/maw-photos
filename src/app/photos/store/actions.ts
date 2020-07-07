import { createAction, props } from '@ngrx/store';

import { Photo } from 'src/app/models/photo.model';
import { Rating } from 'src/app/models/rating.model';
import { Comment } from 'src/app/models/comment.model';
import { PhotoRotation } from 'src/app/models/photo-rotation.model';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { ExifContainer } from 'src/app/models/exif-container';
import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { GpsDetail } from 'src/app/models/gps-detail.model';

export const clearRequest = createAction(
    '[Photos] Clear'
);

export const loadRequest = createAction(
    '[Photos] Load Request',
    props<{ categoryId: number }>()
);

export const loadFailure = createAction(
    '[Photos] Load Failure',
    props<{ error: string }>()
);

export const loadSuccess = createAction(
    '[Photos] Load Success',
    props<{ photos: Photo[] }>()
);

export const loadCommentsRequest = createAction(
    '[Photos] Load Comments Request',
    props<{ photoId: number }>()
);

export const loadCommentsFailure = createAction(
    '[Photos] Load Comments Failure',
    props<{ error: string }>()
);

export const loadCommentsSuccess = createAction(
    '[Photos] Load Comments Success',
    props<{ comments: Comment[] }>()
);

export const loadExifRequest = createAction(
    '[Photos] Load Exif Request',
    props<{ photoId: number }>()
);

export const loadExifFailure = createAction(
    '[Photos] Load Exif Failure',
    props<{ error: string }>()
);

export const loadExifSuccess = createAction(
    '[Photos] Load Exif Success',
    props<{ exif: ExifContainer }>()
);

export const loadMultipleRandomRequest = createAction(
    '[Photos] Load Multiple Random Request',
    props<{ count: number }>()
);

export const loadMultipleRandomFailure = createAction(
    '[Photos] Load Multiple Random Failure',
    props<{ error: string }>()
);

export const loadMultipleRandomSuccess = createAction(
    '[Photos] Load Multiple Random Success',
    props<{ photos: Photo[] }>()
);

export const loadRandomRequest = createAction(
    '[Photos] Load Random Request'
);

export const loadRandomFailure = createAction(
    '[Photos] Load Random Failure',
    props<{ error: string }>()
);

export const loadRandomSuccess = createAction(
    '[Photos] Load Random Success',
    props<{ photo: Photo }>()
);

export const loadRatingRequest = createAction(
    '[Photos] Load Rating Request',
    props<{ photoId: number }>()
);

export const loadRatingFailure = createAction(
    '[Photos] Load Rating Failure',
    props<{ error: string }>()
);

export const loadRatingSuccess = createAction(
    '[Photos] Load Rating Success',
    props<{ rating: Rating }>()
);

export const addCommentRequest = createAction(
    '[Photos] Add Comment Request',
    props<{ photoId: number, comment: string }>()
);

export const addCommentFailure = createAction(
    '[Photos] Add Comment Failure',
    props<{ error: string }>()
);

export const addCommentSuccess = createAction(
    '[Photos] Add Comment Success',
    props<{ photoId: number }>()
);

export const ratePhotoRequest = createAction(
    '[Photos] Rate Photo Request',
    props<{ photoId: number, userRating: number }>()
);

export const ratePhotoFailure = createAction(
    '[Photos] Rate Photo Failure',
    props<{ error: string }>()
);

export const ratePhotoSuccess = createAction(
    '[Photos] Rate Photo Success',
    props<{ rating: Rating }>()
);

export const moveNextRequest = createAction(
    '[Photos] Move Next Request'
);

export const moveNextWithGpsRequest = createAction(
    '[Photos] Move Next With GPS Request'
);

export const movePreviousRequest = createAction(
    '[Photos] Move Previous Request'
);

export const movePreviousWithGpsRequest = createAction(
    '[Photos] Move Previous With GPS Request'
);

export const rotateClockwiseRequest = createAction(
    '[Photos] Rotate Clockwise Request'
);

export const rotateCounterClockwiseRequest = createAction(
    '[Photos] Rotate Counter Clockwise Request'
);

export const rotateSuccess = createAction(
    '[Photos] Rotate Success',
    props<{ newRotation: PhotoRotation }>()
);

export const flipHorizontalRequest = createAction(
    '[Photos] Flip Horizontal Request'
);

export const flipVerticalRequest = createAction(
    '[Photos] Flip Vertical Request'
);

export const resetEffectsRequest = createAction(
    '[Photos] Reset Effects Request'
);

export const updateEffectsRequest = createAction(
    '[Photos] Update Effects Request',
    props<{ effects: PhotoEffects }>()
);

export const startSlideshowRequest = createAction(
    '[Photos] Start Slideshow Request'
);

export const stopSlideshowRequest = createAction(
    '[Photos] Stop Slideshow Request'
);

export const toggleSlideshowRequest = createAction(
    '[Photos] Toggle Slideshow Request'
);

export const enterFullscreenRequest = createAction(
    '[Photos] Enter Fullscreen Request'
);

export const exitFullscreenRequest = createAction(
    '[Photos] Exit Fullscreen Request'
);

export const toggleFullscreenRequest = createAction(
    '[Photos] Toggle Fullscreen Request'
);

export const enterMapViewRequest = createAction(
    '[Photos] Enter Map View Request'
);

export const exitMapViewRequest = createAction(
    '[Photos] Exit Map View Request'
);

export const toggleMapViewRequest = createAction(
    '[Photos] Toggle Map View Request'
);

export const setCurrent = createAction(
    '[Photos] Set Current',
    props<{ photo: Photo }>()
);

export const clearCurrent = createAction(
    '[Photos] Clear Current'
);

export const setCurrentById = createAction(
    '[Photos] Set Current By Id',
    props<{ id: number }>()
);

export const loadGpsDetailRequest = createAction(
    '[Photos] Load GPS Detail Request',
    props<{ photoId: number }>()
);

export const loadGpsDetailFailure = createAction(
    '[Photos] Load GPS Detail Failure',
    props<{ error: string }>()
);

export const loadGpsDetailSuccess = createAction(
    '[Photos] Load GPS Detail Success',
    props<{ gpsDetail: GpsDetail }>()
);

export const setGpsCoordinateOverrideRequest = createAction(
    '[Photos] Set GPS Coordinate Override Request',
    props<{ photoId: number, latLng: GpsCoordinate }>()
);

export const setGpsCoordinateOverrideFailure = createAction(
    '[Photos] Set GPS Coordinate Override Failure',
    props<{ error: string }>()
);

export const setGpsCoordinateOverrideSuccess = createAction(
    '[Photos] Set GPS Coordinate Override Success',
    props<{ photoId: number, gpsDetail: GpsDetail }>()
);

export const setGpsCoordinateOverrideAndMoveNextRequest = createAction(
    '[Photos] Set GPS Coordinate Override and Move Next Request',
    props<{ photoId: number, latLng: GpsCoordinate }>()
);

export const enterBulkEditViewRequest = createAction(
    '[Photos] Enter Bulk Edit View Request'
);

export const exitBulkEditViewRequest = createAction(
    '[Photos] Exit Bulk Edit View Request'
);

export const toggleBulkEditViewRequest = createAction(
    '[Photos] Toggle Bulk Edit View Request'
);

export const enterGridViewRequest = createAction(
    '[Photos] Enter Grid View Request'
);

export const exitGridViewRequest = createAction(
    '[Photos] Exit Grid View Request'
);

export const toggleGridViewRequest = createAction(
    '[Photos] Toggle Grid View Request'
);
