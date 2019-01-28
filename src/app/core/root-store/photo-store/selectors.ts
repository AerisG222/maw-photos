import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { Photo } from '../../models/photo.model';
import { photoAdapter, State } from './state';
import { PHOTO_FEATURE_NAME } from './photo-store.module';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getCurrentPhoto = (state: State): Photo => state.currentPhoto;

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
