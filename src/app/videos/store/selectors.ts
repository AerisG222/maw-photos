import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Video } from '@models/video.model';
import { Comment } from '@models/comment.model';
import { Rating } from '@models/rating.model';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { videoAdapter, State } from './state';
import { GpsDetail } from '@models/gps-detail.model';
import { SettingsStoreSelectors } from '@core/root-store';

export const selectVideoState = createFeatureSelector<State>(VIDEO_FEATURE_NAME);

const { selectAll, selectEntities, selectIds } = videoAdapter.getSelectors(selectVideoState);

export const allVideos = selectAll;
export const allEntities = selectEntities;
export const allIds = selectIds;

export const error = createSelector(
    selectVideoState,
    (state: State): string | null => state.error
);

export const isLoading = createSelector(
    selectVideoState,
    (state: State): boolean => state.isLoading
);

export const activeVideoId = createSelector(
    selectVideoState,
    (state: State): number | null => state.activeVideoId
);

export const activeVideoIndex = createSelector(
    selectIds,
    activeVideoId,
    (ids: string[] | number[], id: number | null): number | null => !!id ? (ids as number[]).indexOf(id) : null
);

export const activeVideo = createSelector(
    selectEntities,
    activeVideoId,
    (entities: Dictionary<Video>, id: number | null) => {
        if (!!id) {
            const cat = entities[id];

            if (!!cat) {
                return cat;
            }
        }

        return null;
    }
);

export const firstVideo = createSelector(
    selectIds,
    selectEntities,
    (ids: string[] | number[], entities: Dictionary<Video>) => entities[ids[0]] ?? null
);

export const lastVideo = createSelector(
    selectIds,
    selectEntities,
    (ids: string[] | number[], entities: Dictionary<Video>) => entities[ids[ids.length - 1]] ?? null
);

export const activeVideoRating = createSelector(
    selectVideoState,
    (state: State): Rating => state.activeVideoRating
);

export const activeVideoComments = createSelector(
    selectVideoState,
    (state: State): Comment[] => state.activeVideoComments
);

export const activeVideoGpsDetail = createSelector(
    selectVideoState,
    (state: State): GpsDetail | null => state.activeVideoGpsDetail
);

export const isFullscreenView = createSelector(
    selectVideoState,
    (state: State): boolean => state.isFullscreenView
);

export const isActiveVideoFirst = createSelector(
    activeVideo,
    firstVideo,
    (active, first) => {
        return active != null &&
            first != null &&
            active.id === first.id;
    }
);

export const isActiveVideoLast = createSelector(
    activeVideo,
    lastVideo,
    (active, last) => {
        return active != null &&
            last != null &&
            active.id === last.id;
    }
);

export const videosForCategory = createSelector(
    allVideos,
    (videos: Video[], props: { id: number }) => {
        if (!!videos) {
            return videos.filter(x => x.categoryId === props.id);
        } else {
            return null;
        }
    }
);

export const videoById = createSelector(
    selectEntities,
    (videos: Dictionary<Video>, props: { id: number }) => {
        if (!!videos && !!props.id) {
            return videos[props.id] ?? null;
        } else {
            return null;
        }
    }
);

export const nextVideoIndex = createSelector(
    selectAll,
    activeVideoIndex,
    isActiveVideoLast,
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

export const nextVideoId = createSelector(
    selectIds,
    nextVideoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const nextVideo = createSelector(
    selectEntities,
    nextVideoId,
    (entities, nextId) => {
        return !!nextId ? entities[nextId] as Video : null;
    }
);

export const previousVideoIndex = createSelector(
    selectAll,
    activeVideoIndex,
    isActiveVideoFirst,
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

export const previousVideoId = createSelector(
    selectIds,
    previousVideoIndex,
    (ids, idx) => idx >= 0 ? (ids as number[])[idx] : null
);

export const previousVideo = createSelector(
    selectEntities,
    previousVideoId,
    (entities, previousId) => {
        return !!previousId ? entities[previousId] as Video : null;
    }
);

export const activeVideoGpsDetailSource = createSelector(
    activeVideoGpsDetail,
    detail => detail?.source ?? null
);

export const activeVideoGpsDetailOverride = createSelector(
    activeVideoGpsDetail,
    detail => detail?.override ?? null
);

export const activeVideoGoogleLatLng = createSelector(
    activeVideo,
    video => {
        if (!!video && !!video.latitude && video.longitude) {
            return new google.maps.LatLng(video.latitude, video.longitude);
        }

        return null;
    }
);

export const isCommentCardVisible = createSelector(
    SettingsStoreSelectors.videoInfoPanelExpandedState,
    SettingsStoreSelectors.videoInfoPanelShowComments,
    (isExpanded, showComments) => isExpanded && showComments
);

export const isRatingCardVisible = createSelector(
    SettingsStoreSelectors.videoInfoPanelExpandedState,
    SettingsStoreSelectors.videoInfoPanelShowRatings,
    (isExpanded, showRatings) => isExpanded && showRatings
);

export const isMetadataEditorCardVisible = createSelector(
    SettingsStoreSelectors.videoInfoPanelExpandedState,
    SettingsStoreSelectors.videoInfoPanelShowMetadataEditor,
    (isExpanded, showEditor) => isExpanded && showEditor
);
