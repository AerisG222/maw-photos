import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { Video } from 'src/app/models/video.model';
import { Comment } from 'src/app/models/comment.model';
import { Rating } from 'src/app/models/rating.model';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { videoAdapter, State } from './state';
import { GpsDetail } from 'src/app/models/gps-detail.model';

const getError = (state: State): string | null => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getCurrentVideo = (state: State): Video | null => state.currentVideo;
const getFirstVideo = (state: State): Video | null => state.entities[state.ids[0]] ?? null;
const getLastVideo = (state: State): Video | null => state.entities[state.ids[state.ids.length - 1]] ?? null;
const getCurrentVideoRating = (state: State): Rating | null => state.currentVideoRating;
const getCurrentVideoComments = (state: State): Comment[] | null => state.currentVideoComments;
const getCurrentVideoGpsDetail = (state: State): GpsDetail | null => state.currentVideoGpsDetail;
const getIsFullscreenView = (state: State): boolean => state.isFullscreenView;

export const selectVideoState = createFeatureSelector<State>(VIDEO_FEATURE_NAME);

export const selectAllVideos = videoAdapter.getSelectors(selectVideoState).selectAll;

export const selectVideosForCategory =
    createSelector(selectAllVideos, (videos: Video[], props: { id: number }) => {
        if (videos) {
            return videos.filter(x => x.categoryId === props.id);
        } else {
            return null;
        }
    });

export const selectVideoById =
    createSelector(selectAllVideos, (videos: Video[], props: { id: number }) => {
        if (videos) {
            return videos.find(p => p.id === props.id);
        } else {
            return null;
        }
    });

export const selectVideoError = createSelector(selectVideoState, getError);
export const selectIsLoading = createSelector(selectVideoState, getIsLoading);
export const selectCurrentVideo = createSelector(selectVideoState, getCurrentVideo);
export const selectFirstVideo = createSelector(selectVideoState, getFirstVideo);
export const selectLastVideo = createSelector(selectVideoState, getLastVideo);
export const selectCurrentVideoRating = createSelector(selectVideoState, getCurrentVideoRating);
export const selectCurrentVideoComments = createSelector(selectVideoState, getCurrentVideoComments);
export const selectCurrentVideoGpsDetail = createSelector(selectVideoState, getCurrentVideoGpsDetail);
export const selectIsFullscreenView = createSelector(selectVideoState, getIsFullscreenView);

export const selectIsCurrentVideoFirst =
    createSelector(selectCurrentVideo, selectFirstVideo, (current, first) => {
        return current != null &&
            first != null &&
            current.id === first.id;
    });

export const selectIsCurrentVideoLast =
    createSelector(selectCurrentVideo, selectLastVideo, (current, last) => {
        return current != null &&
            last != null &&
            current.id === last.id;
    });
