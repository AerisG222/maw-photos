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
import { RouterStoreSelectors } from 'src/app/core/root-store';

const photoHasGpsData = (photo: Photo) => photo?.latitude !== null;

const photoState = createFeatureSelector<State>(PHOTO_FEATURE_NAME);

const { selectAll, selectEntities, selectIds } = photoAdapter.getSelectors(photoState);

export const allPhotos = selectAll;

export const error = createSelector(
    photoState,
    (state: State): string | null => state.error
);

export const isLoading = createSelector(
    photoState,
    (state: State): boolean => state.isLoading
);

export const pendingActionCount = createSelector(
    photoState,
    (state: State): number => state.pendingActionCount
);

export const activePhotoId = createSelector(
    photoState,
    (state: State): number | null => state.activePhotoId
);

export const activePhotoRating = createSelector(
    photoState,
    (state: State): Rating | null => state.activePhotoRating
);

export const activePhotoComments = createSelector(
    photoState,
    (state: State): Comment[] | null => state.activePhotoComments
);

export const activePhotoExifData = createSelector(
    photoState,
    (state: State): ExifContainer | null => state.activePhotoExifData
);

export const activePhotoEffects = createSelector(
    photoState,
    (state: State): PhotoEffects | null => state.activePhotoEffects
);

export const activePhotoGpsDetail = createSelector(
    photoState,
    (state: State): GpsDetail | null => state.activePhotoGpsDetail
);

export const slideshowIsPlaying = createSelector(
    photoState,
    (state: State): boolean => state.slideshowIsPlaying
);

export const isFullscreenView = createSelector(
    photoState,
    (state: State): boolean => state.isFullscreenView
);

export const isMapView = createSelector(
    photoState,
    (state: State): boolean => state.isMapView
);

export const isBulkEditView = createSelector(
    photoState,
    (state: State): boolean => state.isBulkEditView
);

export const isGridView = createSelector(
    photoState,
    (state: State): boolean => state.isGridView
);

export const hasPendingActions = createSelector(
    pendingActionCount,
    (count: number): boolean => count > 0
);

export const activePhotoIndex = createSelector(
    selectIds,
    activePhotoId,
    (ids: string[] | number[], id: number | null): number | null => !!id ? (ids as number[]).indexOf(id) : null
);

export const activePhoto = createSelector(
    selectEntities,
    activePhotoId,
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

export const firstPhoto = createSelector(
    selectAll,
    isMapView,
    (photos: Photo[], isMapView: boolean) => {
        if (isMapView) {
            return photos.find(photoHasGpsData) ?? null;
        }

        return photos[0] ?? null;
    }
);

export const lastPhoto = createSelector(
    selectAll,
    isMapView,
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

export const isActivePhotoFirst = createSelector(
    firstPhoto,
    activePhotoId,
    (first, id) => first?.id === id
);

export const isActivePhotoLast = createSelector(
    lastPhoto,
    activePhotoId,
    (last, id) => last?.id === id
);

export const nextPhotoIndex = createSelector(
    selectAll,
    activePhotoIndex,
    isActivePhotoLast,
    isMapView,
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

export const nextPhotoId = createSelector(
    selectIds,
    nextPhotoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const previousPhotoIndex = createSelector(
    selectAll,
    activePhotoIndex,
    isActivePhotoFirst,
    isMapView,
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

export const previousPhotoId = createSelector(
    selectIds,
    previousPhotoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const photosForCategory = createSelector(
    allPhotos,
    (photos: Photo[], props: { id: number }) => {
        if (photos) {
            return photos.filter(x => x.categoryId === props.id);
        } else {
            return null;
        }
    }
);

export const photoById = createSelector(
    selectEntities,
    (photos: Dictionary<Photo>, props: { id: number }) => {
        if (!!photos && !!props.id) {
            return photos[props.id] ?? null;
        } else {
            return null;
        }
    }
);

export const photosWithGpsCoordinates = createSelector(
    allPhotos,
    (photos: Photo[]) => {
        if (!!photos) {
            return photos.filter(x => x.latitude !== null);
        } else {
            return null;
        }
    }
);

export const hasPhotosWithGpsCoordinates = createSelector(
    photosWithGpsCoordinates,
    (photos: Photo[] | null): boolean => !!photos && photos.length > 0
);

export const enableMapView = createSelector(
    hasPhotosWithGpsCoordinates,
    RouterStoreSelectors.isRandomView,
    (hasGps, isRandom) => hasGps && !isRandom
);
