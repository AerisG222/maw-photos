import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
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

export const selectVideoState: MemoizedSelector<object, State> = createFeatureSelector<State>(VIDEO_FEATURE_NAME);

export const selectAllVideos: (state: object) => Video[] = videoAdapter.getSelectors(selectVideoState).selectAll;

export const selectVideosForCategory = (categoryId: number) =>
    createSelector(selectAllVideos, (photos: Video[]) => {
        if (photos) {
            return photos.filter(x => x.categoryId === categoryId);
        } else {
            return null;
        }
    });

export const selectVideoById = (id: number) =>
    createSelector(selectAllVideos, (photos: Video[]) => {
        if (photos) {
            return photos.find(p => p.id === id);
        } else {
            return null;
        }
    });

export const selectVideoError: MemoizedSelector<object, any> = createSelector(selectVideoState, getError);
export const selectVideoIsLoading: MemoizedSelector<object, boolean> = createSelector(selectVideoState, getIsLoading);
export const selectCurrentVideo: MemoizedSelector<object, Video> = createSelector(selectVideoState, getCurrentVideo);
export const selectFirstVideo: MemoizedSelector<object, Video> = createSelector(selectVideoState, getFirstVideo);
export const selectLastVideo: MemoizedSelector<object, Video> = createSelector(selectVideoState, getLastVideo);
export const selectCurrentVideoRating: MemoizedSelector<object, Rating> = createSelector(selectVideoState, getCurrentVideoRating);
// tslint:disable-next-line:max-line-length
export const selectCurrentVideoComments: MemoizedSelector<object, Comment[]> = createSelector(selectVideoState, getCurrentVideoComments);
export const selectIsFullscreenView: MemoizedSelector<object, boolean> = createSelector(selectVideoState, getIsFullscreenView);

export const selectIsCurrentVideoFirst: MemoizedSelector<object, boolean> =
    createSelector(selectCurrentVideo, selectFirstVideo, (current, first) => {
        return current != null &&
            first != null &&
            current.id === first.id;
    });

export const selectIsCurrentVideoLast: MemoizedSelector<object, boolean> =
    createSelector(selectCurrentVideo, selectLastVideo, (current, last) => {
        return current != null &&
            last != null &&
            current.id === last.id;
    });
