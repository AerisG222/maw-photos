import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

import { Video } from 'src/app/core/models/video.model';
import { Comment } from 'src/app/core/models/comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { VIDEO_FEATURE_NAME } from './feature-name';
import { videoAdapter, State } from './state';

export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getCurrentVideo = (state: State): Video => state.currentVideo;
export const getFirstVideo = (state: State): Video => state.firstVideo;
export const getLastVideo = (state: State): Video => state.lastVideo;
export const getCurrentVideoRating = (state: State): Rating => state.currentVideoRating;
export const getCurrentVideoComments = (state: State): Comment[] => state.currentVideoComments;
export const getIsFullscreenView = (state: State): boolean => state.isFullscreenView;

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
export const selectVideoIsLoading = createSelector(selectVideoState, getIsLoading);
export const selectCurrentVideo = createSelector(selectVideoState, getCurrentVideo);
export const selectFirstVideo = createSelector(selectVideoState, getFirstVideo);
export const selectLastVideo = createSelector(selectVideoState, getLastVideo);
export const selectCurrentVideoRating = createSelector(selectVideoState, getCurrentVideoRating);
export const selectCurrentVideoComments = createSelector(selectVideoState, getCurrentVideoComments);
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
