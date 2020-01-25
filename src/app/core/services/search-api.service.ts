import { Observable } from 'rxjs';

import { SearchResult } from '../models/search/search-result.model';

export const searchApiServiceToken = 'SearchApiService';

export interface SearchApiService {
    search(query: string): Observable<SearchResult>;
}
