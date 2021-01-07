import { createReducer, on } from '@ngrx/store';

import * as PhotoActions from './actions';
import { Photo } from 'src/app/models/photo.model';
import { photoAdapter, initialState, State } from './state';

// TODO: set gps detail in photo itself
export const reducer = createReducer(
    initialState,
    on(PhotoActions.clearRequest, (state): State => (
        photoAdapter.removeAll({
            ...state,
            activePhotoId: null
        })
    )),
    on(PhotoActions.loadRequest, (state, { categoryId }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadSuccess, (state, { photos }): State =>
        photoAdapter.setAll(photos, {
            ...state,
            isLoading: false,
            error: null})
    ),
    on(PhotoActions.loadFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadCommentsRequest, (state, { photoId }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadCommentsSuccess, (state, { comments }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoComments: comments
    })),
    on(PhotoActions.loadCommentsFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadRandomRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadRandomSuccess, (state, { photo }): State =>
        photoAdapter.upsertOne(photo, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(PhotoActions.loadRandomFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadMultipleRandomRequest, (state): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadMultipleRandomSuccess, (state, { photos }): State => {
        const uniquePhotos = photos.filter((s1, pos, arr) => arr.findIndex((s2) => s2.id === s1.id) === pos);

        return photoAdapter.addMany(uniquePhotos, {
            ...state,
            isLoading: false,
            error: null
        });
    }),
    on(PhotoActions.loadMultipleRandomFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadRatingRequest, (state, { photoId }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadRatingSuccess, (state, { rating }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoRating: rating
    })),
    on(PhotoActions.loadRatingFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.setActivePhotoId, (state, { id }): State => ({
        ...state,
        activePhotoId: id
    })),
    on(PhotoActions.ratePhotoRequest, (state, { photoId, userRating }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.ratePhotoSuccess, (state, { rating }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoRating: {
            userRating: rating.userRating,
            averageRating: Math.round(rating.averageRating)
        }
    })),
    on(PhotoActions.ratePhotoFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.addCommentRequest, (state, { photoId, comment }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.addCommentSuccess, (state, { photoId }): State => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(PhotoActions.addCommentFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadExifRequest, (state, { photoId }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadExifSuccess, (state, { exif }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoExifData: exif
    })),
    on(PhotoActions.loadExifFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadGpsDetailRequest, (state, { photoId }): State => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadGpsDetailSuccess, (state, { gpsDetail }): State => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoGpsDetail: gpsDetail
    })),
    on(PhotoActions.loadGpsDetailFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.setGpsCoordinateOverrideRequest, (state, { photoId }): State => ({
        ...state,
        isLoading: true,
        error: null,
        pendingActionCount: state.pendingActionCount + 1,
    })),
    on(PhotoActions.setGpsCoordinateOverrideSuccess, (state, { photoId, gpsDetail }): State => {
        const photo = state.entities[photoId] as Photo;
        const updatedState = ({
            ...state,
            isLoading: false,
            error: null,
            activePhotoGpsDetail: gpsDetail,
            pendingActionCount: state.pendingActionCount - 1,
        });

        if (!!photo) {
            const newPhoto = ({
                ...photo,
                latitude: gpsDetail.override.latitude,
                longitude: gpsDetail.override.longitude
            });

            return photoAdapter.upsertOne(newPhoto, updatedState);
        } else {
            return updatedState;
        }
    }),
    on(PhotoActions.setGpsCoordinateOverrideFailure, (state, { error }): State => ({
        ...state,
        isLoading: false,
        error,
        pendingActionCount: state.pendingActionCount - 1,
    })),
    on(PhotoActions.rotateSuccess, (state, { newRotation }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            rotation: newRotation
        }
    })),
    on(PhotoActions.flipHorizontalRequest, (state): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            flipHorizontal: !state.activePhotoEffects.flipHorizontal
        }
    })),
    on(PhotoActions.flipVerticalRequest, (state): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            flipVertical: !state.activePhotoEffects.flipVertical
        }
    })),
    on(PhotoActions.updateEffectsRequest, (state, { effects }): State => ({
        ...state,
        activePhotoEffects: {
            ...effects
        }
    })),
    on(PhotoActions.updateEffectBlur, (state, { blur }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            blur
        }
    })),
    on(PhotoActions.updateEffectBrightness, (state, { brightness }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            brightness
        }
    })),
    on(PhotoActions.updateEffectContrast, (state, { contrast }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            contrast
        }
    })),
    on(PhotoActions.updateEffectGrayscale, (state, { grayscale }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            grayscale
        }
    })),
    on(PhotoActions.updateEffectHueRotate, (state, { hueRotate }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            hueRotate
        }
    })),
    on(PhotoActions.updateEffectInvert, (state, { invert }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            invert
        }
    })),
    on(PhotoActions.updateEffectSaturation, (state, { saturation }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            saturation
        }
    })),
    on(PhotoActions.updateEffectSepia, (state, { sepia }): State => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            sepia
        }
    })),
    on(PhotoActions.startSlideshowRequest, (state): State => ({
        ...state,
        slideshowIsPlaying: true
    })),
    on(PhotoActions.stopSlideshowRequest, (state): State => ({
        ...state,
        slideshowIsPlaying: false
    })),
    on(PhotoActions.exitPhotoArea, (state): State =>
        photoAdapter.removeAll({
            ...initialState
        })
    )
);
