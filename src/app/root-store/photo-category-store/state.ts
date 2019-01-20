import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ICategory } from 'src/app/models/icategory.model';

export const featureAdapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>({
    selectId: model => model.id,
    sortComparer: (a: ICategory, b: ICategory): number => a.id - b.id
});

export interface State extends EntityState<ICategory> {
    error: string;
    isLoading: boolean;
}

export const initialState: State = featureAdapter.getInitialState({
    isLoading: false,
    error: null
});
