import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchApiService } from '../search-api.service';
import { SearchResult } from '../../models/search/search-result.model';
import { MultimediaCategory } from '../../models/search/multimedia-category.model';

@Injectable()
export class ExternalSearchApiService implements SearchApiService {
    constructor() { }

    search(query: string): Observable<SearchResult<MultimediaCategory>> {
        throw new Error('Method not implemented.');
    }

    searchNextPage(start: number): Observable<SearchResult<MultimediaCategory>> {
        throw new Error('Method not implemented.');
    }
}
