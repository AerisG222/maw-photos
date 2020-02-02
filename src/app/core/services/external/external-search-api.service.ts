import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SearchApiService } from '../search-api.service';
import { SearchResult } from '../../models/search/search-result.model';
import { MultimediaCategory } from '../../models/search/multimedia-category.model';
import { config } from '../../../../environments/config';

@Injectable()
export class ExternalSearchApiService implements SearchApiService {
    constructor(
        private http: HttpClient
    ) {

    }

    search(query: string, start: number): Observable<SearchResult<MultimediaCategory>> {
        const url = this.getAbsoluteUrl(`search/multimedia-categories`);
        const params = new HttpParams()
            .set('query', query)
            .set('start', start.toString());

        return this.http
            .get<SearchResult<MultimediaCategory>>(url, { params });
    }

    private getAbsoluteUrl(relativeUrl: string) {
        return `${config.apiUrl}/${relativeUrl}`;
    }
}
