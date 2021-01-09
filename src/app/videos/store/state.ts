import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Comment } from '@models/comment.model';
import { Rating } from '@models/rating.model';
import { Video } from '@models/video.model';
import { GpsDetail } from '@models/gps-detail.model';

export const videoAdapter: EntityAdapter<Video> = createEntityAdapter<Video>({
    sortComparer: (a: Video, b: Video): number => b.id - a.id
});

export interface State extends EntityState<Video> {
    error: string | null;
    isLoading: boolean;
    activeVideoId: number | null;
    activeVideoRating: Rating;
    activeVideoComments: Comment[];
    activeVideoGpsDetail: GpsDetail | null;
    isFullscreenView: boolean;
}

export const initialState: State = videoAdapter.getInitialState({
    isLoading: false,
    error: null,
    activeVideoId: null,
    activeVideoRating: { averageRating: 0, userRating: 0 },
    activeVideoComments: [],
    activeVideoGpsDetail: null,
    isFullscreenView: false
});
