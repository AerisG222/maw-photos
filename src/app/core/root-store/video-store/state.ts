import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Comment } from 'src/app/core/models/comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { Video } from '../../models/video.model';

export const videoAdapter: EntityAdapter<Video> = createEntityAdapter<Video>({
    sortComparer: (a: Video, b: Video): number => b.id - a.id
});

export interface State extends EntityState<Video> {
    error: string;
    isLoading: boolean;
    currentVideo: Video;
    firstVideo: Video;
    lastVideo: Video;
    currentVideoRating: Rating;
    currentVideoComments: Comment[];
    isFullscreenView: boolean;
}

export const initialState: State = videoAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentVideo: null,
    firstVideo: null,
    lastVideo: null,
    currentVideoRating: null,
    currentVideoComments: null,
    isFullscreenView: false
});
