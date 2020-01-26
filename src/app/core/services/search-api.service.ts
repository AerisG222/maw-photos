import { Observable } from 'rxjs';

import { SearchResult } from '../models/search/search-result.model';
import { MultimediaCategory } from '../models/search/multimedia-category.model';

export const searchApiServiceToken = 'SearchApiService';

export interface SearchApiService {
    search(query: string): Observable<SearchResult<MultimediaCategory>>;
    searchNextPage(start: number): Observable<SearchResult<MultimediaCategory>>;
}
