import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Photo } from 'src/app/models/photo.model';
import { Comment } from 'src/app/models/comment.model';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { Rating } from 'src/app/models/rating.model';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { photoAdapter, State } from './state';
import { ExifContainer } from 'src/app/models/exif-container';
import { GpsDetail } from 'src/app/models/gps-detail.model';

const photoHasGpsData = (photo: Photo) => photo?.latitude !== null;

const photoState = createFeatureSelector<State>(PHOTO_FEATURE_NAME);

const { selectAll, selectEntities, selectIds } = photoAdapter.getSelectors(photoState);

export const selectAllPhotos = selectAll;

export const selectPhotoError = createSelector(
    photoState,
    (state: State): string | null => state.error
);

export const selectIsLoading = createSelector(
    photoState,
    (state: State): boolean => state.isLoading
);

export const selectPendingActionCount = createSelector(
    photoState,
    (state: State): number => state.pendingActionCount
);

export const selectActivePhotoId = createSelector(
    photoState,
    (state: State): number | null => state.activePhotoId
);

export const selectActivePhotoRating = createSelector(
    photoState,
    (state: State): Rating | null => state.activePhotoRating
);

export const selectActivePhotoComments = createSelector(
    photoState,
    (state: State): Comment[] | null => state.activePhotoComments
);

export const selectActivePhotoExifData = createSelector(
    photoState,
    (state: State): ExifContainer | null => state.activePhotoExifData
);

export const selectActivePhotoEffects = createSelector(
    photoState,
    (state: State): PhotoEffects | null => state.activePhotoEffects
);

export const selectActivePhotoGpsDetail = createSelector(
    photoState,
    (state: State): GpsDetail | null => state.activePhotoGpsDetail
);

export const selectSlideshowIsPlaying = createSelector(
    photoState,
    (state: State): boolean => state.slideshowIsPlaying
);

export const selectIsFullscreenView = createSelector(
    photoState,
    (state: State): boolean => state.isFullscreenView
);

export const selectIsMapView = createSelector(
    photoState,
    (state: State): boolean => state.isMapView
);

export const selectIsBulkEditView = createSelector(
    photoState,
    (state: State): boolean => state.isBulkEditView
);

export const selectIsGridView = createSelector(
    photoState,
    (state: State): boolean => state.isGridView
);

export const selectActivePhotoIndex = createSelector(
    selectIds,
    selectActivePhotoId,
    (ids: string[] | number[], id: number | null): number | null => !!id ? (ids as number[]).indexOf(id) : null
);

export const selectActivePhoto = createSelector(
    selectEntities,
    selectActivePhotoId,
    (entities: Dictionary<Photo>, id: number | null) => {
        if (!!id) {
            const photo = entities[id];

            if (!!photo) {
                return photo;
            }
        }

        return null;
    }
);

export const selectFirstPhoto = createSelector(
    selectAll,
    selectIsMapView,
    (photos: Photo[], isMapView: boolean) => {
        if (isMapView) {
            return photos.find(photoHasGpsData) ?? null;
        }

        return photos[0] ?? null;
    }
);

export const selectLastPhoto = createSelector(
    selectAll,
    selectIsMapView,
    (photos: Photo[], isMapView: boolean) => {
        if (isMapView) {
            for (let i = photos.length; i >= 0; i--) {
                const photo = photos[i];

                if (photoHasGpsData(photo)) {
                    return photo;
                }
            }

            return null;
        }

        return photos[photos.length - 1] ?? null;
    }
);

export const selectIsActivePhotoFirst = createSelector(
    selectFirstPhoto,
    selectActivePhotoId,
    (first, id) => first?.id === id
);

export const selectIsActivePhotoLast = createSelector(
    selectLastPhoto,
    selectActivePhotoId,
    (last, id) => last?.id === id
);

export const selectNextPhotoIndex = createSelector(
    selectAll,
    selectActivePhotoIndex,
    selectIsActivePhotoLast,
    selectIsMapView,
    (photos, activePhotoIndex, isActivePhotoLast, isMapView) => {
        if (isActivePhotoLast) {
            return activePhotoIndex as number;
        }

        if (activePhotoIndex === null) {
            activePhotoIndex = -1;
        }

        if (isMapView) {
            for (let i = activePhotoIndex + 1; i < photos.length; i++) {
                if (photoHasGpsData(photos[i])) {
                    return i;
                }
            }

            return -1;
        } else {
            const nextIndex = activePhotoIndex + 1;

            return nextIndex < photos.length ? nextIndex : -1;
        }
    }
);

export const selectNextPhotoId = createSelector(
    selectIds,
    selectNextPhotoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const selectPreviousPhotoIndex = createSelector(
    selectAll,
    selectActivePhotoIndex,
    selectIsActivePhotoFirst,
    selectIsMapView,
    (photos, activePhotoIndex, isActivePhotoFirst, isMapView) => {
        if (isActivePhotoFirst) {
            return activePhotoIndex as number;
        }

        if (activePhotoIndex === null) {
            activePhotoIndex = -1;
        }

        if (isMapView) {
            for (let i = activePhotoIndex - 1; i >= 0; i--) {
                if (photoHasGpsData(photos[i])) {
                    return i;
                }
            }

            return -1;
        } else {
            const previousIndex = activePhotoIndex - 1;

            return previousIndex >= 0 ? previousIndex : -1;
        }
    }
);

export const selectPreviousPhotoId = createSelector(
    selectIds,
    selectPreviousPhotoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const selectPhotosForCategory = createSelector(
    selectAllPhotos,
    (photos: Photo[], props: { id: number }) => {
        if (photos) {
            return photos.filter(x => x.categoryId === props.id);
        } else {
            return null;
        }
    }
);

export const selectPhotoById = createSelector(
    selectEntities,
    (photos: Dictionary<Photo>, props: { id: number }) => {
        if (!!photos && !!props.id) {
            return photos[props.id] ?? null;
        } else {
            return null;
        }
    }
);

export const selectPhotosWithGpsCoordinates = createSelector(
    selectAllPhotos,
    (photos: Photo[]) => {
        if (!!photos) {
            return photos.filter(x => x.latitude !== null);
        } else {
            return null;
        }
    }
);

export const selectHasPhotosWithGpsCoordinates = createSelector(
    selectPhotosWithGpsCoordinates,
    (photos: Photo[] | null): boolean => !!photos && photos.length > 0
);
