import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ICategory } from 'src/app/models/icategory.model';

export const photoCategoryAdapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>({
    sortComparer: (a: ICategory, b: ICategory): number => a.id - b.id
});

export interface State extends EntityState<ICategory> {
    error: string;
    isLoading: boolean;
}

export const initialState: State = photoCategoryAdapter.getInitialState({
    isLoading: false,
    error: null
});
