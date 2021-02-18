import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import {
    Photo,
    Comment,
    PhotoEffects,
    Rating,
    ExifContainer,
    GpsDetail,
    CategoryGpsStatus
 } from '@models';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { photoAdapter, State } from './state';
import * as PhotoCategoryStoreSelectors from '@core/root-store/photo-category-store/selectors';
import * as RouterStoreSelectors from '@core/root-store/router-store/selectors';
import * as SettingsStoreSelectors from '@core/root-store/settings-store/selectors';

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
    (state: State): Rating => state.activePhotoRating
);

export const activePhotoComments = createSelector(
    photoState,
    (state: State): Comment[] => state.activePhotoComments
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

export const hasPendingActions = createSelector(
    pendingActionCount,
    (count: number): boolean => count > 0
);

export const categoryIdForActivePhoto = createSelector(
    photoState,
    (state: State): number | null => state.activePhotoCategoryId
);

export const activePhotoIndex = createSelector(
    selectIds,
    activePhotoId,
    (ids: string[] | number[], id: number | null): number | null => id ? (ids as number[]).indexOf(id) : null
);

export const activePhoto = createSelector(
    selectEntities,
    activePhotoId,
    (entities: Dictionary<Photo>, id: number | null) => {
        if (id) {
            const photo = entities[id];

            if (photo) {
                return photo;
            }
        }

        return null;
    }
);

export const firstPhoto = createSelector(
    selectAll,
    RouterStoreSelectors.isPhotosMapView,
    (photos: Photo[], showMapView: boolean) => {
        if (showMapView) {
            return photos.find(photoHasGpsData) ?? null;
        }

        return photos[0] ?? null;
    }
);

export const lastPhoto = createSelector(
    selectAll,
    RouterStoreSelectors.isPhotosMapView,
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
    RouterStoreSelectors.isPhotosMapView,
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
        return nextId ? entities[nextId] as Photo : null;
    }
);

export const previousPhotoIndex = createSelector(
    selectAll,
    activePhotoIndex,
    isActivePhotoFirst,
    RouterStoreSelectors.isPhotosMapView,
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
        return previousId ? entities[previousId] as Photo : null;
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
        if (photos) {
            return photos.filter(x => x.latitude !== null && x.longitude !== null);
        } else {
            return null;
        }
    }
);

export const photosWithGpsCoordinatesAsMapImages = createSelector(
    photosWithGpsCoordinates,
    photos => {
        if(photos) {
            return photos.map(x => ({
                id: x.id,
                imageUrl: x.imageXsSq.url,
                latitude: x.latitude as number,
                longitude: x.longitude as number
            }));
        }

        return null;
    }
);

export const categoryGpsStatus = createSelector(
    PhotoCategoryStoreSelectors.activeCategoryId,
    allPhotos,
    (categoryId: number | null, photos: Photo[]) => {
        if(!categoryId || !photos) {
            return null;
        }

        const isMissingGpsData = !!photos.find(photo => photo.latitude === null || photo.longitude === null);

        return { categoryId: categoryId , isMissingGpsData } as CategoryGpsStatus;
    }
);

export const activePhotoGpsDetailSource = createSelector(
    activePhotoGpsDetail,
    detail => detail?.source ?? null
);

export const activePhotoGpsDetailOverride = createSelector(
    activePhotoGpsDetail,
    detail => detail?.override ?? null
);

export const hasPhotosWithGpsCoordinates = createSelector(
    photosWithGpsCoordinates,
    (photos: Photo[] | null): boolean => !!photos && photos.length > 0
);

export const activePhotoGoogleLatLng = createSelector(
    activePhoto,
    photo => {
        if (!!photo && !!photo.latitude && photo.longitude) {
            return new google.maps.LatLng(photo.latitude, photo.longitude);
        }

        return null;
    }
);

export const activePhotoSmDownloadUrl = createSelector(
    activePhoto,
    photo => photo?.imageSm.downloadUrl
);

export const activePhotoMdDownloadUrl = createSelector(
    activePhoto,
    photo => photo?.imageMd.downloadUrl
);

export const activePhotoLgDownloadUrl = createSelector(
    activePhoto,
    photo => photo?.imageLg.downloadUrl
);

export const activePhotoPrtDownloadUrl = createSelector(
    activePhoto,
    photo => photo?.imagePrt.downloadUrl
);

export const enableMapView = createSelector(
    hasPhotosWithGpsCoordinates,
    RouterStoreSelectors.isRandomView,
    (hasGps, isRandom) => hasGps && !isRandom
);

export const isCommentCardVisible = createSelector(
    RouterStoreSelectors.isPhotosDetailView,
    SettingsStoreSelectors.photoInfoPanelSettings,
    (isDetailView, infoPanel) => isDetailView && infoPanel.expandedState && infoPanel.showComments
);

export const isRatingCardVisible = createSelector(
    RouterStoreSelectors.isPhotosDetailView,
    SettingsStoreSelectors.photoInfoPanelSettings,
    (isDetailView, infoPanel) => isDetailView && infoPanel.expandedState && infoPanel.showRatings
);

export const isMetadataEditorCardVisible = createSelector(
    RouterStoreSelectors.isPhotosDetailView,
    SettingsStoreSelectors.photoInfoPanelSettings,
    (isDetailView, infoPanel) => isDetailView && infoPanel.expandedState && infoPanel.showMetadataEditor
);

export const isExifCardVisible = createSelector(
    RouterStoreSelectors.isPhotosDetailView,
    SettingsStoreSelectors.photoInfoPanelSettings,
    (isDetailView, infoPanel) => isDetailView && infoPanel.expandedState && infoPanel.showExif
);

// hmm - does it seem funny that we reference the photo category selectors here?
export const categoryForActivePhoto = createSelector(
    categoryIdForActivePhoto,
    PhotoCategoryStoreSelectors.allEntities,
    (categoryId, entities) => {
        if(categoryId) {
            return entities[categoryId];
        } else {
            return null;
        }
    }
);

export const activeCategory = createSelector(
    categoryForActivePhoto,
    PhotoCategoryStoreSelectors.activeCategory,
    (activePhotoCat, activeCat) => {
        return (activePhotoCat ?? activeCat) || null;
    }
);
