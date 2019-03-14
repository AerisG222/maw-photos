import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';

export const photoCategoryAdapter: EntityAdapter<PhotoCategory> = createEntityAdapter<PhotoCategory>({
    sortComparer: (a: PhotoCategory, b: PhotoCategory): number => b.id - a.id
});

export interface State extends EntityState<PhotoCategory> {
    error: string;
    isLoading: boolean;
    currentCategory: PhotoCategory;
}

export const initialState: State = photoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentCategory: null
});
