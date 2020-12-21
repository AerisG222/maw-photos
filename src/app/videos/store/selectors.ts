import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Video } from 'src/app/models/video.model';
import { Comment } from 'src/app/models/comment.model';
import { Rating } from 'src/app/models/rating.model';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { videoAdapter, State } from './state';
import { GpsDetail } from 'src/app/models/gps-detail.model';

export const selectVideoState = createFeatureSelector<State>(VIDEO_FEATURE_NAME);

const { selectAll, selectEntities, selectIds } = videoAdapter.getSelectors(selectVideoState);

export const selectAllVideos = selectAll;

export const selectVideoError = createSelector(
    selectVideoState,
    (state: State): string | null => state.error
);

export const selectIsLoading = createSelector(
    selectVideoState,
    (state: State): boolean => state.isLoading
);

export const selectActiveVideoId = createSelector(
    selectVideoState,
    (state: State): number | null => state.activeVideoId
);

export const selectActiveVideo = createSelector(
    selectEntities,
    selectActiveVideoId,
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

export const selectFirstVideo = createSelector(
    selectIds,
    selectEntities,
    (ids: string[] | number[], entities: Dictionary<Video>) => entities[ids[0]] ?? null
);

export const selectLastVideo = createSelector(
    selectIds,
    selectEntities,
    (ids: string[] | number[], entities: Dictionary<Video>) => entities[ids[ids.length - 1]] ?? null
);

export const selectActiveVideoRating = createSelector(
    selectVideoState,
    (state: State): Rating | null => state.activeVideoRating
);

export const selectActiveVideoComments = createSelector(
    selectVideoState,
    (state: State): Comment[] | null => state.activeVideoComments
);

export const selectActiveVideoGpsDetail = createSelector(
    selectVideoState,
    (state: State): GpsDetail | null => state.activeVideoGpsDetail
);

export const selectIsFullscreenView = createSelector(
    selectVideoState,
    (state: State): boolean => state.isFullscreenView
);

export const selectIsActiveVideoFirst = createSelector(
    selectActiveVideo,
    selectFirstVideo,
    (active, first) => {
        return active != null &&
            first != null &&
            active.id === first.id;
    }
);

export const selectIsActiveVideoLast = createSelector(
    selectActiveVideo,
    selectLastVideo,
    (active, last) => {
        return active != null &&
            last != null &&
            active.id === last.id;
    }
);

export const selectVideosForCategory = createSelector(
    selectAllVideos,
    (videos: Video[], props: { id: number }) => {
        if (!!videos) {
            return videos.filter(x => x.categoryId === props.id);
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
