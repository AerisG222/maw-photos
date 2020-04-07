import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../models/search-result.model';
import { MultimediaCategory } from '../models/multimedia-category.model';

export const searchApiServiceToken = new InjectionToken<SearchApiService>('SearchApiService');

export interface SearchApiService {
    search(query: string, start: number): Observable<SearchResult<MultimediaCategory>>;
}
