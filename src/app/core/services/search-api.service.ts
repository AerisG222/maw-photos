import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../models/search/search-result.model';
import { MultimediaCategory } from '../models/search/multimedia-category.model';

export const searchApiServiceToken = new InjectionToken<SearchApiService>('SearchApiService');

export interface SearchApiService {
    search(query: string, start: number): Observable<SearchResult<MultimediaCategory>>;
}
