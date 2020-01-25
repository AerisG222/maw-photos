import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchApiService } from '../search-api.service';
import { SearchResult } from '../../models/search/search-result.model';

@Injectable()
export class MockSearchApiService implements SearchApiService {
    constructor() { }

    search(query: string): Observable<SearchResult> {
        throw new Error('Method not implemented.');
    }
}
