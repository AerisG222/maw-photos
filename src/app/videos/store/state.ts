import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Comment, GpsDetail, Rating, Video } from '@models';

export const videoAdapter: EntityAdapter<Video> = createEntityAdapter<Video>({
    sortComparer: (a: Video, b: Video): number => b.id - a.id,
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
    isFullscreenView: false,
});
