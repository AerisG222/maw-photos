import { createReducer, on } from '@ngrx/store';

import * as PhotoActions from './actions';
import { Photo } from 'src/app/models/photo.model';
import { photoAdapter, initialState } from './state';

// TODO: set gps detail in photo itself
export const reducer = createReducer(
    initialState,
    on(PhotoActions.clearRequest, state => (
        photoAdapter.removeAll({
            ...state,
            activePhotoId: null
        })
    )),
    on(PhotoActions.loadRequest, (state, { categoryId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadSuccess, (state, { photos }) =>
        photoAdapter.setAll(photos, {
            ...state,
            isLoading: false,
            error: null})
    ),
    on(PhotoActions.loadFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadCommentsRequest, (state, { photoId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadCommentsSuccess, (state, { comments }) => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoComments: comments
    })),
    on(PhotoActions.loadCommentsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadRandomRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadRandomSuccess, (state, { photo }) =>
        photoAdapter.upsertOne(photo, {
            ...state,
            isLoading: false,
            error: null
        })
    ),
    on(PhotoActions.loadRandomFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadMultipleRandomRequest, state => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadMultipleRandomSuccess, (state, { photos }) => {
        const uniquePhotos = photos.filter((s1, pos, arr) => arr.findIndex((s2) => s2.id === s1.id) === pos);

        return photoAdapter.addMany(uniquePhotos, {
            ...state,
            isLoading: false,
            error: null
        });
    }),
    on(PhotoActions.loadMultipleRandomFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadRatingRequest, (state, { photoId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadRatingSuccess, (state, { rating }) => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoRating: rating
    })),
    on(PhotoActions.loadRatingFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.setActivePhotoId, (state, { id }) => ({
        ...state,
        activePhotoId: id
    })),
    on(PhotoActions.ratePhotoRequest, (state, { photoId, userRating }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.ratePhotoSuccess, (state, { rating }) => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoRating: {
            userRating: rating.userRating,
            averageRating: Math.round(rating.averageRating)
        }
    })),
    on(PhotoActions.ratePhotoFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.addCommentRequest, (state, { photoId, comment }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.addCommentSuccess, (state, { photoId }) => ({
        ...state,
        isLoading: false,
        error: null
    })),
    on(PhotoActions.addCommentFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadExifRequest, (state, { photoId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadExifSuccess, (state, { exif }) => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoExifData: exif
    })),
    on(PhotoActions.loadExifFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.loadGpsDetailRequest, (state, { photoId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadGpsDetailSuccess, (state, { gpsDetail }) => ({
        ...state,
        isLoading: false,
        error: null,
        activePhotoGpsDetail: gpsDetail
    })),
    on(PhotoActions.loadGpsDetailFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.setGpsCoordinateOverrideRequest, (state, { photoId }) => ({
        ...state,
        isLoading: true,
        error: null,
        pendingActionCount: state.pendingActionCount + 1,
    })),
    on(PhotoActions.setGpsCoordinateOverrideSuccess, (state, { photoId, gpsDetail }) => {
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
    on(PhotoActions.setGpsCoordinateOverrideFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
        pendingActionCount: state.pendingActionCount - 1,
    })),
    on(PhotoActions.rotateSuccess, (state, { newRotation }) => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            rotation: newRotation
        }
    })),
    on(PhotoActions.flipHorizontalRequest, state => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            flipHorizontal: !state.activePhotoEffects.flipHorizontal
        }
    })),
    on(PhotoActions.flipVerticalRequest, state => ({
        ...state,
        activePhotoEffects: {
            ...state.activePhotoEffects,
            flipVertical: !state.activePhotoEffects.flipVertical
        }
    })),
    on(PhotoActions.updateEffectsRequest, (state, { effects }) => ({
        ...state,
        activePhotoEffects: {
            ...effects
        }
    })),
    on(PhotoActions.toggleSlideshowRequest, state => ({
        ...state,
        slideshowIsPlaying: !state.slideshowIsPlaying
    })),
    on(PhotoActions.startSlideshowRequest, state => ({
        ...state,
        slideshowIsPlaying: true
    })),
    on(PhotoActions.stopSlideshowRequest, state => ({
        ...state,
        slideshowIsPlaying: false
    })),
    on(PhotoActions.toggleFullscreenRequest, state => ({
        ...state,
        isFullscreenView: !state.isFullscreenView
    })),
    on(PhotoActions.enterFullscreenRequest, state => ({
        ...state,
        isFullscreenView: true
    })),
    on(PhotoActions.exitFullscreenRequest, state => ({
        ...state,
        isFullscreenView: false
    })),
    on(PhotoActions.enterMapViewRequest, state => ({
        ...state,
        isMapView: true
    })),
    on(PhotoActions.exitMapViewRequest, state => ({
        ...state,
        isMapView: false
    })),
    on(PhotoActions.toggleMapViewRequest, state => ({
        ...state,
        isMapView: !state.isMapView
    })),
    on(PhotoActions.enterBulkEditViewRequest, state => ({
        ...state,
        isBulkEditView: true
    })),
    on(PhotoActions.exitBulkEditViewRequest, state => ({
        ...state,
        isBulkEditView: false
    })),
    on(PhotoActions.toggleBulkEditViewRequest, state => ({
        ...state,
        isBulkEditView: !state.isBulkEditView
    })),
    on(PhotoActions.enterGridViewRequest, state => ({
        ...state,
        isGridView: true
    })),
    on(PhotoActions.exitGridViewRequest, state => ({
        ...state,
        isGridView: false
    })),
    on(PhotoActions.toggleGridViewRequest, state => ({
        ...state,
        isGridView: !state.isGridView
    }))
);
