import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Category } from 'src/app/models/category.model';

export const photoCategoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
    sortComparer: (a: Category, b: Category): number => b.id - a.id
});

export interface State extends EntityState<Category> {
    error: string | null;
    isLoading: boolean;
    currentCategoryId: number | null;
}

export const initialState: State = photoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentCategoryId: null
});
