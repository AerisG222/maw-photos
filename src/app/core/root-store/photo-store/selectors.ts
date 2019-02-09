import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { ExifData } from 'src/app/core/models/exif-data.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
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
export const getCurrentPhotoComments = (state: State): PhotoComment[] => state.currentPhotoComments;
export const getCurrentPhotoExifData = (state: State): ExifData[] => state.currentPhotoExifData;
export const getCurrentPhotoEffects = (state: State): PhotoEffects => state.currentPhotoEffects;
export const getSlideshowIsPlaying = (state: State): boolean => state.slideshowIsPlaying;
export const getIsFullscreenView = (state: State): boolean => state.isFullscreenView;

export const selectPhotoState: MemoizedSelector<object, State> = createFeatureSelector<State>(PHOTO_FEATURE_NAME);

export const selectAllPhotos: (state: object) => Photo[] = photoAdapter.getSelectors(selectPhotoState).selectAll;

export const selectPhotosForCategory = (categoryId: number) =>
    createSelector(selectAllPhotos, (photos: Photo[]) => {
        if (photos) {
            return photos.filter(x => x.categoryId === categoryId);
        } else {
            return null;
        }
    });

export const selectPhotoById = (id: number) =>
    createSelector(selectAllPhotos, (photos: Photo[]) => {
        if (photos) {
            return photos.find(p => p.id === id);
        } else {
            return null;
        }
    });

export const selectPhotoError: MemoizedSelector<object, any> = createSelector(selectPhotoState, getError);
export const selectPhotoIsLoading: MemoizedSelector<object, boolean> = createSelector(selectPhotoState, getIsLoading);
export const selectCurrentPhoto: MemoizedSelector<object, Photo> = createSelector(selectPhotoState, getCurrentPhoto);
export const selectFirstPhoto: MemoizedSelector<object, Photo> = createSelector(selectPhotoState, getFirstPhoto);
export const selectLastPhoto: MemoizedSelector<object, Photo> = createSelector(selectPhotoState, getLastPhoto);
export const selectCurrentPhotoRating: MemoizedSelector<object, Rating> = createSelector(selectPhotoState, getCurrentPhotoRating);
// tslint:disable-next-line:max-line-length
export const selectCurrentPhotoComments: MemoizedSelector<object, PhotoComment[]> = createSelector(selectPhotoState, getCurrentPhotoComments);
export const selectCurrentPhotoExifData: MemoizedSelector<object, ExifData[]> = createSelector(selectPhotoState, getCurrentPhotoExifData);
export const selectCurrentPhotoEffects: MemoizedSelector<object, PhotoEffects> = createSelector(selectPhotoState, getCurrentPhotoEffects);
export const selectSlideshowIsPlaying: MemoizedSelector<object, boolean> = createSelector(selectPhotoState, getSlideshowIsPlaying);
export const selectIsFullscreenView: MemoizedSelector<object, boolean> = createSelector(selectPhotoState, getIsFullscreenView);

export const selectIsCurrentPhotoFirst: MemoizedSelector<object, boolean> =
    createSelector(selectCurrentPhoto, selectFirstPhoto, (current, first) => {
        return current != null &&
            first != null &&
            current.id === first.id;
    });

export const selectIsCurrentPhotoLast: MemoizedSelector<object, boolean> =
    createSelector(selectCurrentPhoto, selectLastPhoto, (current, last) => {
        return current != null &&
            last != null &&
            current.id === last.id;
    });
