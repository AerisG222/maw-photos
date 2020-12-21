import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Category } from 'src/app/models/category.model';

export const VideoCategoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
    sortComparer: (a: Category, b: Category): number => b.id - a.id
});

export interface State extends EntityState<Category> {
    error: string | null;
    isLoading: boolean;
    activeCategoryId: number | null;
}

export const initialState: State = VideoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    activeCategoryId: null
});
