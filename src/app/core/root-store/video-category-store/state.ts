import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { VideoCategory } from 'src/app/core/models/video-category.model';

export const VideoCategoryAdapter: EntityAdapter<VideoCategory> = createEntityAdapter<VideoCategory>({
    sortComparer: (a: VideoCategory, b: VideoCategory): number => a.id - b.id
});

export interface State extends EntityState<VideoCategory> {
    error: string;
    isLoading: boolean;
    currentCategory: VideoCategory;
}

export const initialState: State = VideoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentCategory: null
});
