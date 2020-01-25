
import { MultimediaCategory } from '../../models/search/multimedia-category.model';
import { SearchResult } from '../../models/search/search-result.model';

export interface State {
    error: string;
    isLoading: boolean;
    searchResult: SearchResult<MultimediaCategory>;
}

export const initialState: State = {
    isLoading: false,
    error: null,
    searchResult: null
};
