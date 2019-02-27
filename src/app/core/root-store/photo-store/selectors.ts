import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { ExifData } from 'src/app/core/models/exif-data.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Comment } from 'src/app/core/models/comment.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { Rating } from 'src/app/core/models/rating.model';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { photoAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getCurrentPhoto = (state: State): Photo => state.currentPhoto;
export const getFirstPhoto = (state: State): Photo => state.firstPhoto;
export const getLastPhoto = (state: State): Photo => state.lastPhoto;
export const getCurrentPhotoRating = (state: State): Rating => state.currentPhotoRating;
export const getCurrentPhotoComments = (state: State): Comment[] => state.currentPhotoComments;
export const getCurrentPhotoExifData = (state: State): ExifData[] => state.currentPhotoExifData;
export const getCurrentPhotoEffects = (state: State): PhotoEffects => state.currentPhotoEffects;
export const getSlideshowIsPlaying = (state: State): boolean => state.slideshowIsPlaying;
export const getIsFullscreenView = (state: State): boolean => state.isFullscreenView;

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

export const selectPhotoError = createSelector(selectPhotoState, getError);
export const selectPhotoIsLoading = createSelector(selectPhotoState, getIsLoading);
export const selectCurrentPhoto = createSelector(selectPhotoState, getCurrentPhoto);
export const selectFirstPhoto = createSelector(selectPhotoState, getFirstPhoto);
export const selectLastPhoto = createSelector(selectPhotoState, getLastPhoto);
export const selectCurrentPhotoRating = createSelector(selectPhotoState, getCurrentPhotoRating);
export const selectCurrentPhotoComments = createSelector(selectPhotoState, getCurrentPhotoComments);
export const selectCurrentPhotoExifData = createSelector(selectPhotoState, getCurrentPhotoExifData);
export const selectCurrentPhotoEffects = createSelector(selectPhotoState, getCurrentPhotoEffects);
export const selectSlideshowIsPlaying = createSelector(selectPhotoState, getSlideshowIsPlaying);
export const selectIsFullscreenView = createSelector(selectPhotoState, getIsFullscreenView);

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
