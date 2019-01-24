import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Category } from 'src/app/core/models/category.model';

export const photoCategoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
    sortComparer: (a: Category, b: Category): number => a.id - b.id
});

export interface State extends EntityState<Category> {
    error: string;
    isLoading: boolean;
}

export const initialState: State = photoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null
});
