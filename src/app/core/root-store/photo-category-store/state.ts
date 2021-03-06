import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Category } from '@models';

export const photoCategoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>(
    {
        sortComparer: (a: Category, b: Category): number => b.id - a.id,
    }
);

export interface State extends EntityState<Category> {
    error: string | null;
    isLoading: boolean;
    activeCategoryId: number | null;
}

export const initialState: State = photoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    activeCategoryId: null,
});
