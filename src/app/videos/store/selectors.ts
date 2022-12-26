import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Video, GpsDetail, Comment, Rating } from '@models';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { videoAdapter, State } from './state';
import {
    SettingsStoreSelectors,
    VideoCategoryStoreSelectors,
} from '@core/root-store';
import { CategoryGpsStatus } from '@models';

export const videoState = createFeatureSelector<State>(
    VIDEO_FEATURE_NAME
);

const { selectAll, selectEntities, selectIds } = videoAdapter.getSelectors(
    videoState
);

export const allVideos = selectAll;
export const allEntities = selectEntities;
export const allIds = selectIds;

export const selectError = createSelector(
    videoState,
    (state: State): string | null => state.error
);

export const selectIsLoading = createSelector(
    videoState,
    (state: State): boolean => state.isLoading
);

export const selectActiveVideoId = createSelector(
    videoState,
    (state: State): number | null => state.activeVideoId
);

export const selectActiveVideoIndex = createSelector(
    selectIds,
    selectActiveVideoId,
    (ids: string[] | number[], id: number | null): number | null =>
        id ? (ids as number[]).indexOf(id) : null
);

export const selectActiveVideo = createSelector(
    selectEntities,
    selectActiveVideoId,
    (entities: Dictionary<Video>, id: number | null) => {
        if (id) {
            const cat = entities[id];

            if (cat) {
                return cat;
            }
        }

        return null;
    }
);

export const selectFirstVideo = createSelector(
    selectIds,
    selectEntities,
    (ids: string[] | number[], entities: Dictionary<Video>) =>
        entities[ids[0]] ?? null
);

export const selectLastVideo = createSelector(
    selectIds,
    selectEntities,
    (ids: string[] | number[], entities: Dictionary<Video>) =>
        entities[ids[ids.length - 1]] ?? null
);

export const selectActiveVideoRating = createSelector(
    videoState,
    (state: State): Rating => state.activeVideoRating
);

export const selectActiveVideoComments = createSelector(
    videoState,
    (state: State): Comment[] => state.activeVideoComments
);

export const selectActiveVideoGpsDetail = createSelector(
    videoState,
    (state: State): GpsDetail | null => state.activeVideoGpsDetail
);

export const selectIsFullscreenView = createSelector(
    videoState,
    (state: State): boolean => state.isFullscreenView
);

export const selectIsActiveVideoFirst = createSelector(
    selectActiveVideo,
    selectFirstVideo,
    (active, first) => {
        return active != null && first != null && active.id === first.id;
    }
);

export const selectIsActiveVideoLast = createSelector(
    selectActiveVideo,
    selectLastVideo,
    (active, last) => {
        return active != null && last != null && active.id === last.id;
    }
);

export const selectVideosForCategory = createSelector(
    allVideos,
    (videos: Video[], props: { id: number }) => {
        if (videos) {
            return videos.filter((x) => x.categoryId === props.id);
        } else {
            return null;
        }
    }
);

export const selectVideoById = createSelector(
    selectEntities,
    (videos: Dictionary<Video>, props: { id: number }) => {
        if (!!videos && !!props.id) {
            return videos[props.id] ?? null;
        } else {
            return null;
        }
    }
);

export const selectNextVideoIndex = createSelector(
    selectAll,
    selectActiveVideoIndex,
    selectIsActiveVideoLast,
    (videos, activeIndex, isLast) => {
        if (isLast) {
            return activeIndex as number;
        }

        if (activeIndex === null) {
            activeIndex = -1;
        }

        const nextIndex = activeIndex + 1;

        return nextIndex < videos.length ? nextIndex : -1;
    }
);

export const selectNextVideoId = createSelector(
    selectIds,
    selectNextVideoIndex,
    (ids, idx) => (idx >= 0 ? (ids as number[])[idx] : null)
);

export const selectNextVideo = createSelector(
    selectEntities,
    selectNextVideoId,
    (entities, nextId) => {
        return nextId ? (entities[nextId] as Video) : null;
    }
);

export const selectPreviousVideoIndex = createSelector(
    selectAll,
    selectActiveVideoIndex,
    selectIsActiveVideoFirst,
    (videos, activeIndex, isFirst) => {
        if (isFirst) {
            return activeIndex as number;
        }

        if (activeIndex === null) {
            activeIndex = -1;
        }

        const previousIndex = activeIndex - 1;

        return previousIndex >= 0 ? previousIndex : -1;
    }
);

export const selectPreviousVideoId = createSelector(
    selectIds,
    selectPreviousVideoIndex,
    (ids, idx) => (idx >= 0 ? (ids as number[])[idx] : null)
);

export const selectPreviousVideo = createSelector(
    selectEntities,
    selectPreviousVideoId,
    (entities, previousId) => {
        return previousId ? (entities[previousId] as Video) : null;
    }
);

export const selectActiveVideoGpsDetailSource = createSelector(
    selectActiveVideoGpsDetail,
    (detail) => detail?.source ?? null
);

export const selectActiveVideoGpsDetailOverride = createSelector(
    selectActiveVideoGpsDetail,
    (detail) => detail?.override ?? null
);

export const selectActiveVideoGoogleLatLng = createSelector(selectActiveVideo, (video) => {
    if (!!video && !!video.latitude && video.longitude) {
        return new google.maps.LatLng(video.latitude, video.longitude);
    }

    return null;
});

export const selectIsCommentCardVisible = createSelector(
    SettingsStoreSelectors.selectVideoInfoPanelSettings,
    (infoPanel) => infoPanel.expandedState && infoPanel.showComments
);

export const selectIsRatingCardVisible = createSelector(
    SettingsStoreSelectors.selectVideoInfoPanelSettings,
    (infoPanel) => infoPanel.expandedState && infoPanel.showRatings
);

export const selectIsMetadataEditorCardVisible = createSelector(
    SettingsStoreSelectors.selectVideoInfoPanelSettings,
    (infoPanel) => infoPanel.expandedState && infoPanel.showMetadataEditor
);

export const selectCategoryGpsStatus = createSelector(
    VideoCategoryStoreSelectors.selectActiveCategoryId,
    allVideos,
    (categoryId, videos) => {
        if (!categoryId || !videos) {
            return null;
        }

        const isMissingGpsData = !!videos.find(
            (video) => video.latitude === null || video.longitude === null
        );

        return {
            categoryId: categoryId,
            isMissingGpsData,
        } as CategoryGpsStatus;
    }
);
