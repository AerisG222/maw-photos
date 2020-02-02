
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { MultimediaCategory } from '../../models/search/multimedia-category.model';
import { SearchResult } from '../../models/search/search-result.model';

export const searchAdapter: EntityAdapter<MultimediaCategory> = createEntityAdapter<MultimediaCategory>({
    sortComparer: (a: MultimediaCategory, b: MultimediaCategory): number => b.score - a.score
});

export interface State extends EntityState<MultimediaCategory> {
    error: string;
    isLoading: boolean;
    query: string;
    currentResult: SearchResult<MultimediaCategory>;
}

export const initialState: State = searchAdapter.getInitialState({
    isLoading: false,
    error: null,
    query: null,
    currentResult: null
});
