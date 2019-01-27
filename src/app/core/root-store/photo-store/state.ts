import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Photo } from 'src/app/core/models/photo.model';

export const photoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
    sortComparer: (a: Photo, b: Photo): number => b.id - a.id
});

export interface State extends EntityState<Photo> {
    error: string;
    isLoading: boolean;
}

export const initialState: State = photoAdapter.getInitialState({
    isLoading: false,
    error: null
});