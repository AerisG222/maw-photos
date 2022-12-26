import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import {
    Photo,
    Comment,
    PhotoEffects,
    Rating,
    ExifContainer,
    GpsDetail,
    CategoryGpsStatus,
} from '@models';
import { PHOTO_FEATURE_NAME } from './feature-name';
import { photoAdapter, State } from './state';
import * as PhotoCategoryStoreSelectors from '@core/root-store/photo-category-store/selectors';
import * as RouterStoreSelectors from '@core/root-store/router-store/selectors';
import * as SettingsStoreSelectors from '@core/root-store/settings-store/selectors';

const photoHasGpsData = (photo: Photo) => photo?.latitude !== null;

const photoState = createFeatureSelector<State>(PHOTO_FEATURE_NAME);

const { selectAll, selectEntities, selectIds } = photoAdapter.getSelectors(
    photoState
);

export const allPhotos = selectAll;
export const allEntities = selectEntities;
export const allIds = selectIds;

export const selectError = createSelector(
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
    (state: State): Rating => state.activePhotoRating
);

export const selectActivePhotoComments = createSelector(
    photoState,
    (state: State): Comment[] => state.activePhotoComments
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

export const selectHasPendingActions = createSelector(
    selectPendingActionCount,
    (count: number): boolean => count > 0
);

export const selectCategoryIdForActivePhoto = createSelector(
    photoState,
    (state: State): number | null => state.activePhotoCategoryId
);

export const selectActivePhotoIndex = createSelector(
    selectIds,
    selectActivePhotoId,
    (ids: string[] | number[], id: number | null): number | null =>
        id ? (ids as number[]).indexOf(id) : null
);

export const selectActivePhoto = createSelector(
    selectEntities,
    selectActivePhotoId,
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

export const selectFirstPhoto = createSelector(
    selectAll,
    RouterStoreSelectors.selectIsPhotosMapView,
    (photos: Photo[], showMapView: boolean) => {
        if (showMapView) {
            return photos.find(photoHasGpsData) ?? null;
        }

        return photos[0] ?? null;
    }
);

export const selectLastPhoto = createSelector(
    selectAll,
    RouterStoreSelectors.selectIsPhotosMapView,
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
    RouterStoreSelectors.selectIsPhotosMapView,
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

export const selectNextPhotoId = createSelector(
    selectIds,
    selectNextPhotoIndex,
    (ids, idx) => (idx >= 0 ? (ids as number[])[idx] : null)
);

export const selectNextPhoto = createSelector(
    selectEntities,
    selectNextPhotoId,
    (entities, nextId) => {
        return nextId ? (entities[nextId] as Photo) : null;
    }
);

export const selectPreviousPhotoIndex = createSelector(
    selectAll,
    selectActivePhotoIndex,
    selectIsActivePhotoFirst,
    RouterStoreSelectors.selectIsPhotosMapView,
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

export const selectPreviousPhotoId = createSelector(
    selectIds,
    selectPreviousPhotoIndex,
    (ids, idx) => (idx >= 0 ? (ids as number[])[idx] : null)
);

export const selectPreviousPhoto = createSelector(
    selectEntities,
    selectPreviousPhotoId,
    (entities, previousId) => {
        return previousId ? (entities[previousId] as Photo) : null;
    }
);

export const selectPhotosForCategory = createSelector(
    allPhotos,
    (photos: Photo[], props: { id: number }) => {
        if (photos) {
            return photos.filter((x) => x.categoryId === props.id);
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
    allPhotos,
    (photos: Photo[]) => {
        if (photos) {
            return photos.filter(
                (x) => x.latitude !== null && x.longitude !== null
            );
        } else {
            return null;
        }
    }
);

export const selectPhotosWithGpsCoordinatesAsMapImages = createSelector(
    selectPhotosWithGpsCoordinates,
    (photos) => {
        if (photos) {
            return photos.map((x) => ({
                id: x.id,
                imageUrl: x.imageXsSq.url,
                latitude: x.latitude as number,
                longitude: x.longitude as number,
            }));
        }

        return null;
    }
);

export const selectCategoryGpsStatus = createSelector(
    PhotoCategoryStoreSelectors.selectActiveCategoryId,
    allPhotos,
    (categoryId: number | null, photos: Photo[]) => {
        if (!categoryId || !photos) {
            return null;
        }

        const isMissingGpsData = !!photos.find(
            (photo) => photo.latitude === null || photo.longitude === null
        );

        return {
            categoryId: categoryId,
            isMissingGpsData,
        } as CategoryGpsStatus;
    }
);

export const selectActivePhotoGpsDetailSource = createSelector(
    selectActivePhotoGpsDetail,
    (detail) => detail?.source ?? null
);

export const selectActivePhotoGpsDetailOverride = createSelector(
    selectActivePhotoGpsDetail,
    (detail) => detail?.override ?? null
);

export const selectHasPhotosWithGpsCoordinates = createSelector(
    selectPhotosWithGpsCoordinates,
    (photos: Photo[] | null): boolean => !!photos && photos.length > 0
);

export const selectActivePhotoGoogleLatLng = createSelector(selectActivePhoto, (photo) => {
    if (!!photo && !!photo.latitude && photo.longitude) {
        return new google.maps.LatLng(photo.latitude, photo.longitude);
    }

    return null;
});

export const selectActivePhotoSmDownloadUrl = createSelector(
    selectActivePhoto,
    (photo) => photo?.imageSm.downloadUrl
);

export const selectActivePhotoMdDownloadUrl = createSelector(
    selectActivePhoto,
    (photo) => photo?.imageMd.downloadUrl
);

export const selectActivePhotoLgDownloadUrl = createSelector(
    selectActivePhoto,
    (photo) => photo?.imageLg.downloadUrl
);

export const selectActivePhotoPrtDownloadUrl = createSelector(
    selectActivePhoto,
    (photo) => photo?.imagePrt.downloadUrl
);

export const selectEnableMapView = createSelector(
    selectHasPhotosWithGpsCoordinates,
    RouterStoreSelectors.selectInRandomArea,
    (hasGps, isRandom) => hasGps && !isRandom
);

export const selectIsCommentCardVisible = createSelector(
    RouterStoreSelectors.selectIsPhotosDetailView,
    SettingsStoreSelectors.selectPhotoInfoPanelSettings,
    (isDetailView, infoPanel) =>
        isDetailView && infoPanel.expandedState && infoPanel.showComments
);

export const selectIsRatingCardVisible = createSelector(
    RouterStoreSelectors.selectIsPhotosDetailView,
    SettingsStoreSelectors.selectPhotoInfoPanelSettings,
    (isDetailView, infoPanel) =>
        isDetailView && infoPanel.expandedState && infoPanel.showRatings
);

export const selectIsMetadataEditorCardVisible = createSelector(
    RouterStoreSelectors.selectIsPhotosDetailView,
    SettingsStoreSelectors.selectPhotoInfoPanelSettings,
    (isDetailView, infoPanel) =>
        isDetailView && infoPanel.expandedState && infoPanel.showMetadataEditor
);

export const selectIsExifCardVisible = createSelector(
    RouterStoreSelectors.selectIsPhotosDetailView,
    SettingsStoreSelectors.selectPhotoInfoPanelSettings,
    (isDetailView, infoPanel) =>
        isDetailView && infoPanel.expandedState && infoPanel.showExif
);

export const selectCategoryForActivePhoto = createSelector(
    selectCategoryIdForActivePhoto,
    PhotoCategoryStoreSelectors.allEntities,
    (categoryId, entities) => {
        if (categoryId) {
            return entities[categoryId];
        } else {
            return null;
        }
    }
);

export const selectActiveCategory = createSelector(
    selectCategoryForActivePhoto,
    PhotoCategoryStoreSelectors.selectActiveCategory,
    (activePhotoCat, activeCat) => {
        return (activePhotoCat ?? activeCat) || null;
    }
);
