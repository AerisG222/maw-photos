import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { VideoCategory } from 'src/app/models/video-category.model';
import { Category } from 'src/app/models/category.model';

export const VideoCategoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
    sortComparer: (a: Category, b: Category): number => b.id - a.id
});

export interface State extends EntityState<Category> {
    error: string | null;
    isLoading: boolean;
    currentCategory: Category | null;
    categoryIdsByYear: Map<number, number[]> | null;
}

export const initialState: State = VideoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentCategory: null,
    categoryIdsByYear: null
});
