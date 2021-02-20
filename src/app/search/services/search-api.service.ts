import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { MultimediaCategory, SearchResult } from '../models';

export const searchApiServiceToken = new InjectionToken<SearchApiService>(
    'SearchApiService'
);

export interface SearchApiService {
    search(
        query: string,
        start: number
    ): Observable<SearchResult<MultimediaCategory>>;
}
