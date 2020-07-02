import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Comment } from 'src/app/models/comment.model';
import { Rating } from 'src/app/models/rating.model';
import { Video } from 'src/app/models/video.model';
import { GpsDetail } from 'src/app/models/gps-detail.model';

export const videoAdapter: EntityAdapter<Video> = createEntityAdapter<Video>({
    sortComparer: (a: Video, b: Video): number => b.id - a.id
});

export interface State extends EntityState<Video> {
    error: string | null;
    isLoading: boolean;
    currentVideo: Video | null;
    currentVideoRating: Rating | null;
    currentVideoComments: Comment[] | null;
    currentVideoGpsDetail: GpsDetail | null;
    isFullscreenView: boolean;
}

export const initialState: State = videoAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentVideo: null,
    currentVideoRating: null,
    currentVideoComments: null,
    currentVideoGpsDetail: null,
    isFullscreenView: false
});
