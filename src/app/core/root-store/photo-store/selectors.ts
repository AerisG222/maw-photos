import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { Photo } from 'src/app/core/models/photo.model';
import { Comment } from 'src/app/core/models/comment.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { Rating } from 'src/app/core/models/rating.model';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { photoAdapter, State } from './state';
import { ExifContainer } from '../../models/exif-container';
import { GpsDetail } from '../../models/gps-detail.model';

const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getCurrentPhoto = (state: State): Photo => state.currentPhoto;
const getFirstPhoto = (state: State): Photo => state.firstPhoto;
const getLastPhoto = (state: State): Photo => state.lastPhoto;
const getCurrentPhotoRating = (state: State): Rating => state.currentPhotoRating;
const getCurrentPhotoComments = (state: State): Comment[] => state.currentPhotoComments;
const getCurrentPhotoExifData = (state: State): ExifContainer => state.currentPhotoExifData;
const getCurrentPhotoEffects = (state: State): PhotoEffects => state.currentPhotoEffects;
const getCurrentPhotoGpsDetail = (state: State): GpsDetail => state.currentPhotoGpsDetail;
const getSlideshowIsPlaying = (state: State): boolean => state.slideshowIsPlaying;
const getIsFullscreenView = (state: State): boolean => state.isFullscreenView;
const getIsMapView = (state: State): boolean => state.isMapView;
const getIsBulkEditView = (state: State): boolean => state.isBulkEditView;
const getHasGpsCoordinates = (photos: Photo[]): boolean => photos !== null && photos.length > 0;

export const selectPhotoState = createFeatureSelector<State>(PHOTO_FEATURE_NAME);

export const selectAllPhotos = photoAdapter.getSelectors(selectPhotoState).selectAll;

export const selectPhotosForCategory =
    createSelector(selectAllPhotos, (photos: Photo[], props: { id: number }) => {
        if (photos) {
            return photos.filter(x => x.categoryId === props.id);
        } else {
            return null;
        }
    });

export const selectPhotoById =
    createSelector(selectAllPhotos, (photos: Photo[], props: { id: number }) => {
        if (photos) {
            return photos.find(p => p.id === props.id);
        } else {
            return null;
        }
    });

export const selectPhotosWithGpsCoordinates =
    createSelector(selectAllPhotos, (photos: Photo[]) => {
        if (photos) {
            return photos.filter(x => x.latitude !== null);
        } else {
            return null;
        }
    });

export const selectPhotoError = createSelector(selectPhotoState, getError);
export const selectPhotoIsLoading = createSelector(selectPhotoState, getIsLoading);
export const selectCurrentPhoto = createSelector(selectPhotoState, getCurrentPhoto);
export const selectFirstPhoto = createSelector(selectPhotoState, getFirstPhoto);
export const selectLastPhoto = createSelector(selectPhotoState, getLastPhoto);
export const selectCurrentPhotoRating = createSelector(selectPhotoState, getCurrentPhotoRating);
export const selectCurrentPhotoComments = createSelector(selectPhotoState, getCurrentPhotoComments);
export const selectCurrentPhotoExifData = createSelector(selectPhotoState, getCurrentPhotoExifData);
export const selectCurrentPhotoEffects = createSelector(selectPhotoState, getCurrentPhotoEffects);
export const selectCurrentPhotoGpsDetail = createSelector(selectPhotoState, getCurrentPhotoGpsDetail);
export const selectSlideshowIsPlaying = createSelector(selectPhotoState, getSlideshowIsPlaying);
export const selectIsFullscreenView = createSelector(selectPhotoState, getIsFullscreenView);
export const selectIsMapView = createSelector(selectPhotoState, getIsMapView);
export const selectIsBulkEditView = createSelector(selectPhotoState, getIsBulkEditView);
export const selectHasPhotosWithGpsCoordinates = createSelector(selectPhotosWithGpsCoordinates, getHasGpsCoordinates);

export const selectIsCurrentPhotoFirst =
    createSelector(selectCurrentPhoto, selectFirstPhoto, (current, first) => {
        return current != null &&
            first != null &&
            current.id === first.id;
    });

export const selectIsCurrentPhotoLast =
    createSelector(selectCurrentPhoto, selectLastPhoto, (current, last) => {
        return current != null &&
            last != null &&
            current.id === last.id;
    });

export const selectFirstPhotoWithGpsCoordinates =
    createSelector(selectPhotosWithGpsCoordinates, (photos) => {
        if (photos == null) {
            return null;
        }

        return photos[0];
    });

export const selectLastPhotoWithGpsCoordinates =
    createSelector(selectPhotosWithGpsCoordinates, (photos) => {
        if (photos == null) {
            return null;
        }

        return photos[photos.length - 1];
    });

export const selectIsCurrentPhotoFirstWithGpsCoordinates =
    createSelector(selectCurrentPhoto, selectFirstPhotoWithGpsCoordinates, (current, first) => {
        return current != null &&
            first != null &&
            current.id === first.id;
    });

export const selectIsCurrentPhotoLastWithGpsCoordinates =
    createSelector(selectCurrentPhoto, selectLastPhotoWithGpsCoordinates, (current, last) => {
        return current != null &&
            last != null &&
            current.id === last.id;
    });
