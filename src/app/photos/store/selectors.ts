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
import { PhotoCategoryStoreSelectors, RouterStoreSelectors, SettingsStoreSelectors } from 'src/app/core/root-store';

const photoHasGpsData = (photo: Photo) => photo?.latitude !== null;

const photoState = createFeatureSelector<State>(PHOTO_FEATURE_NAME);

const { selectAll, selectEntities, selectIds } = photoAdapter.getSelectors(photoState);

export const allPhotos = selectAll;
export const allEntities = selectEntities;
export const allIds = selectIds;

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
    (photos: Photo[], showMapView: boolean) => {
        if (showMapView) {
            return photos.find(photoHasGpsData) ?? null;
        }

        return photos[0] ?? null;
    }
);

export const lastPhoto = createSelector(
    selectAll,
    isMapView,
    (photos: Photo[], showMapView: boolean) => {
        if (showMapView) {
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
    (photos, activeIndex, isLast, showMapView) => {
        if (isLast) {
            return activeIndex as number;
        }

        if (activeIndex === null) {
            activeIndex = -1;
        }

        if (showMapView) {
            for (let i = activeIndex + 1; i < photos.length; i++) {
                if (photoHasGpsData(photos[i])) {
                    return i;
                }
            }

            return -1;
        } else {
            const nextIndex = activeIndex + 1;

            return nextIndex < photos.length ? nextIndex : -1;
        }
    }
);

export const nextPhotoId = createSelector(
    selectIds,
    nextPhotoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const nextPhoto = createSelector(
    selectEntities,
    nextPhotoId,
    (entities, nextId) => {
        return !!nextId ? entities[nextId] as Photo : null;
    }
);

export const previousPhotoIndex = createSelector(
    selectAll,
    activePhotoIndex,
    isActivePhotoFirst,
    isMapView,
    (photos, activeIndex, isFirst, showMapView) => {
        if (isFirst) {
            return activeIndex as number;
        }

        if (activeIndex === null) {
            activeIndex = -1;
        }

        if (showMapView) {
            for (let i = activeIndex - 1; i >= 0; i--) {
                if (photoHasGpsData(photos[i])) {
                    return i;
                }
            }

            return -1;
        } else {
            const previousIndex = activeIndex - 1;

            return previousIndex >= 0 ? previousIndex : -1;
        }
    }
);

export const previousPhotoId = createSelector(
    selectIds,
    previousPhotoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const previousPhoto = createSelector(
    selectEntities,
    previousPhotoId,
    (entities, previousId) => {
        return !!previousId ? entities[previousId] as Photo : null;
    }
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

export const anyPhotosMissingGpsCoordinates = createSelector(
    PhotoCategoryStoreSelectors.activeCategoryId,
    allPhotos,
    (categoryId: number | null, photos: Photo[]) => {
        if(!!!categoryId || !!!photos) {
            return null;
        }

        const isMissingGpsData = !!photos.find(photo => photo.latitude === null || photo.longitude === null);

        return { categoryId: categoryId as number, isMissingGpsData };
    }
);

export const activePhotoGpsDetailSource = createSelector(
    activePhotoGpsDetail,
    detail => detail?.source
);

export const activePhotoGpsDetailOverride = createSelector(
    activePhotoGpsDetail,
    detail => detail?.override
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

export const isCommentCardVisible = createSelector(
    SettingsStoreSelectors.photoInfoPanelExpandedState,
    SettingsStoreSelectors.photoInfoPanelShowComments,
    (isExpanded, showComments) => isExpanded && showComments
);

export const isRatingCardVisible = createSelector(
    SettingsStoreSelectors.photoInfoPanelExpandedState,
    SettingsStoreSelectors.photoInfoPanelShowRatings,
    (isExpanded, showRatings) => isExpanded && showRatings
);

export const isMetadataEditorCardVisible = createSelector(
    SettingsStoreSelectors.photoInfoPanelExpandedState,
    SettingsStoreSelectors.photoInfoPanelShowMetadataEditor,
    (isExpanded, showEditor) => isExpanded && showEditor
);

export const isExifCardVisible = createSelector(
    SettingsStoreSelectors.photoInfoPanelExpandedState,
    SettingsStoreSelectors.photoInfoPanelShowExif,
    (isExpanded, showExif) => isExpanded && showExif
);
