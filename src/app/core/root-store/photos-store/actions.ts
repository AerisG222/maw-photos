import { createAction, props } from '@ngrx/store';

import {
    Photo,
    Rating,
    Comment,
    PhotoRotation,
    PhotoEffects,
    ExifContainer,
    GpsCoordinate,
    GpsDetail,
} from '@models';

export const clearRequest = createAction('[Photos] Clear');

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

export const loadRandomRequest = createAction('[Photos] Load Random Request');

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
    props<{ photoId: number; comment: string }>()
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
    props<{ photoId: number; userRating: number }>()
);

export const ratePhotoFailure = createAction(
    '[Photos] Rate Photo Failure',
    props<{ error: string }>()
);

export const ratePhotoSuccess = createAction(
    '[Photos] Rate Photo Success',
    props<{ rating: Rating }>()
);

export const moveNextRequest = createAction('[Photos] Move Next Request');

export const movePreviousRequest = createAction(
    '[Photos] Move Previous Request'
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

export const updateEffectGrayscale = createAction(
    '[Photos] Update Effect Grayscale',
    props<{ grayscale: number }>()
);

export const updateEffectSepia = createAction(
    '[Photos] Update Effect Sepia',
    props<{ sepia: number }>()
);

export const updateEffectBrightness = createAction(
    '[Photos] Update Effect Brightness',
    props<{ brightness: number }>()
);

export const updateEffectSaturation = createAction(
    '[Photos] Update Effect Saturation',
    props<{ saturation: number }>()
);

export const updateEffectContrast = createAction(
    '[Photos] Update Effect Contrast',
    props<{ contrast: number }>()
);

export const updateEffectInvert = createAction(
    '[Photos] Update Effect Invert',
    props<{ invert: number }>()
);

export const updateEffectBlur = createAction(
    '[Photos] Update Effect Blur',
    props<{ blur: number }>()
);

export const updateEffectHueRotate = createAction(
    '[Photos] Update Effect Hue Rotate',
    props<{ hueRotate: number }>()
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

export const setActivePhotoId = createAction(
    '[Photos] Set Active Photo ID',
    props<{ id: number | null }>()
);

export const setCategoryIdForActivePhoto = createAction(
    '[Photos] Set Category ID for Active Photo',
    props<{ categoryId: number | null }>()
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
    props<{ photoId: number; latLng: GpsCoordinate }>()
);

export const setGpsCoordinateOverrideFailure = createAction(
    '[Photos] Set GPS Coordinate Override Failure',
    props<{ error: string }>()
);

export const setGpsCoordinateOverrideSuccess = createAction(
    '[Photos] Set GPS Coordinate Override Success',
    props<{ photoId: number; gpsDetail: GpsDetail }>()
);

export const setGpsCoordinateOverrideAndMoveNextRequest = createAction(
    '[Photos] Set GPS Coordinate Override and Move Next Request',
    props<{ photoId: number; latLng: GpsCoordinate }>()
);

export const changeViewRequest = createAction(
    '[Photos] Change View Request',
    props<{ view: string }>()
);

export const navigateToPhoto = createAction(
    '[Photos] Navigate to Photo',
    props<{ view: string; categoryId: number; photoId?: number }>()
);

export const enterPhotoArea = createAction('[Photos] Entering Photo Area');

export const exitPhotoArea = createAction('[Photos] Exiting Photo Area');

export const enterRandomArea = createAction('[Photos] Entering Random Area');

export const exitRandomArea = createAction('[Photos] Exiting Random Area');

export const startPeriodicRandomLoad = createAction(
    '[Photos] Start Periodic Random Load'
);

export const stopPeriodicRandomLoad = createAction(
    '[Photos] Stop Periodic Random Load'
);

export const navigateUpFromIndividualPhoto = createAction(
    '[Photos] Navigate Up From Individual Photo'
);
