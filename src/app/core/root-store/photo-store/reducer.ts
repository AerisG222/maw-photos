import { createReducer, on, Action } from '@ngrx/store';

import * as PhotoActions from './actions';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoRotation } from 'src/app/core/models/photo-rotation.model';
import { photoAdapter, initialState, State } from './state';

// TODO: set gps detail in photo itself
const reducer = createReducer(
    initialState,
    on(PhotoActions.clearRequest, state => (
        photoAdapter.removeAll({
            ...state,
            firstPhoto: null,
            lastPhoto: null,
            currentPhoto: null
        })
    )),
    on(PhotoActions.loadRequest, (state, { categoryId }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.loadSuccess, (state, { photos }) => {
        const entities = photoAdapter.addAll(photos, {
            ...state,
            isLoading: false,
            error: null
        });

        entities.firstPhoto = entities.entities[entities.ids[0]],
        entities.lastPhoto = entities.entities[entities.ids[entities.ids.length - 1]];

        return entities;
    }),
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
        currentPhotoComments: comments
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
    on(PhotoActions.loadRandomSuccess, (state, { photo }) => {
        const entities = photoAdapter.upsertOne(photo, {
            ...state,
            isLoading: false,
            error: null
        });

        entities.firstPhoto = entities.entities[entities.ids[0]];
        entities.lastPhoto = entities.entities[entities.ids[entities.ids.length - 1]];

        return entities;
    }),
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

        const entities = photoAdapter.addMany(uniquePhotos, {
            ...state,
            isLoading: false,
            error: null
        });

        entities.firstPhoto = entities.entities[entities.ids[0]];
        entities.lastPhoto = entities.entities[entities.ids[entities.ids.length - 1]];

        return entities;
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
        currentPhotoRating: rating
    })),
    on(PhotoActions.loadRatingFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(PhotoActions.setCurrent, (state, { photo }) => ({
        ...state,
        currentPhoto: photo
    })),
    on(PhotoActions.setCurrentById, (state, { id }) => ({
        ...state,
        currentPhoto: state.entities[id]
    })),
    on(PhotoActions.moveNextRequest, state => {
        const newPhoto = nextPhoto(state);

        if (newPhoto != null &&
            state.currentPhoto != null &&
            newPhoto.id === state.currentPhoto.id) {
            return state;
        }

        return {
            ...state,
            currentPhoto: newPhoto,
            currentPhotoEffects: {
                ...state.currentPhotoEffects,
                rotation: new PhotoRotation()
            }
        };
    }),
    on(PhotoActions.moveNextWithGpsRequest, state => {
        const newPhoto = nextPhotoWithGps(state);

        if (newPhoto != null &&
            state.currentPhoto != null &&
            newPhoto.id === state.currentPhoto.id) {
            return state;
        }

        return {
            ...state,
            currentPhoto: newPhoto,
            currentPhotoEffects: {
                ...state.currentPhotoEffects,
                rotation: new PhotoRotation()
            }
        };
    }),
    on(PhotoActions.movePreviousRequest, state => {
        const newPhoto = previousPhoto(state);

        if (newPhoto != null &&
            state.currentPhoto != null &&
            newPhoto.id === state.currentPhoto.id) {
            return state;
        }

        return {
            ...state,
            currentPhoto: newPhoto,
            currentPhotoEffects: {
                ...state.currentPhotoEffects,
                rotation: new PhotoRotation()
            }
        };
    }),
    on(PhotoActions.movePreviousWithGpsRequest, state => {
        const newPhoto = previousPhotoWithGps(state);

        if (newPhoto != null &&
            state.currentPhoto != null &&
            newPhoto.id === state.currentPhoto.id) {
            return state;
        }

        return {
            ...state,
            currentPhoto: newPhoto,
            currentPhotoEffects: {
                ...state.currentPhotoEffects,
                rotation: new PhotoRotation()
            }
        };
    }),
    on(PhotoActions.ratePhotoRequest, (state, { photoId, userRating }) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(PhotoActions.ratePhotoSuccess, (state, { rating }) => ({
        ...state,
        isLoading: false,
        error: null,
        currentPhotoRating: {
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
        currentPhotoExifData: exif
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
        currentPhotoGpsDetail: gpsDetail
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
        const photo = getPhotoWithId(state, photoId);
        const updatedState = ({
            ...state,
            isLoading: false,
            error: null,
            currentPhotoGpsDetail: gpsDetail,
            pendingActionCount: state.pendingActionCount - 1,
        });

        if(!!photo) {
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
    on(PhotoActions.rotateClockwiseRequest, state =>
        state
    ),
    on(PhotoActions.rotateCounterClockwiseRequest, state =>
        state
    ),
    on(PhotoActions.rotateSuccess, (state, { newRotation }) => ({
        ...state,
        currentPhotoEffects: {
            ...state.currentPhotoEffects,
            rotation: newRotation
        }
    })),
    on(PhotoActions.resetEffectsRequest, state => ({
        ...state,
        currentPhotoEffects: {
            rotation: new PhotoRotation(),
            grayscale: 0,
            sepia: 0,
            brightness: 100,
            saturation: 100,
            contrast: 100,
            invert: 0,
            blur: 0,
            hueRotate: 0
        }
    })),
    on(PhotoActions.updateEffectsRequest, (state, { effects }) => ({
        ...state,
        currentPhotoEffects: {
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
    }))
);

export function photoReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}

function nextPhoto(state: State): Photo {
    return getPhotoAtIndex(state, incrementCurrentIndexWithinBounds(state, 1));
}

function nextPhotoWithGps(state: State): Photo {
    return getPhotoAtIndex(state, incrementCurrentIndexWithinGpsBounds(state, 1));
}

function previousPhoto(state: State): Photo {
    return getPhotoAtIndex(state, incrementCurrentIndexWithinBounds(state, -1));
}

function previousPhotoWithGps(state: State): Photo {
    return getPhotoAtIndex(state, incrementCurrentIndexWithinGpsBounds(state, -1));
}

function getPhotoAtIndex(state: State, idx: number) {
    // entities are keyed by id
    return state.entities[state.ids[idx]];
}

function getPhotoWithId(state: State, id: number) {
    return state.entities[id];
}

function incrementCurrentIndexWithinBounds(state: State, direction: number): number {
    const lastIdx = state.ids.length - 1;
    const idx = getCurrentIndex(state) + direction;

    return Math.max(0, Math.min(idx, lastIdx));
}

function incrementCurrentIndexWithinGpsBounds(state: State, direction: number): number {
    const idx = getCurrentIndex(state);
    let newIdx = idx;

    for (newIdx = idx + direction; newIdx >= 0 && newIdx < state.ids.length; newIdx + direction) {
        const photo = getPhotoAtIndex(state, newIdx);

        if (!!photo && photo.latitude != null) {
            return newIdx;
        }
    }

    return idx;
}

function getCurrentIndex(state: State): number {
    return (state.ids as number[]).findIndex(id => id === state.currentPhoto.id);
}
