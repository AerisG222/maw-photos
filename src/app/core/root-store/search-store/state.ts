
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { MultimediaCategory } from '../../models/search/multimedia-category.model';
import { SearchResult } from '../../models/search/search-result.model';

export const searchAdapter: EntityAdapter<MultimediaCategory> = createEntityAdapter<MultimediaCategory>({
    sortComparer: (a: MultimediaCategory, b: MultimediaCategory): number =>
        (1000 * (b.score - a.score)) +
        (  10 * (b.year - a.year) +
        (   1 * a.name.localeCompare(b.name))
    )
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
