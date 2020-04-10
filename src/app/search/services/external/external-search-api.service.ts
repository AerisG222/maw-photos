import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchApiService } from 'src/app/search/services/search-api.service';
import { SearchResult } from 'src/app/search/models/search-result.model';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ExternalSearchApiService implements SearchApiService {
    constructor(
        private http: HttpClient
    ) {

    }

    search(query: string, start: number): Observable<SearchResult<MultimediaCategory>> {
        const url = this.getAbsoluteApiUrl(`search/multimedia-categories`);
        const params = new HttpParams()
            .set('query', query)
            .set('start', start.toString());

        return this.http
            .get<SearchResult<MultimediaCategory>>(url, { params })
            .pipe(
                map(r => {
                    r.results.forEach(result => {
                        result.teaserPhotoPath = `${ this.getAbsoluteWwwUrl(result.teaserPhotoPath) }`;
                        result.teaserPhotoSqPath = `${ this.getAbsoluteWwwUrl(result.teaserPhotoSqPath) }`;
                    });

                    return r;
                })
            );
    }

    private getAbsoluteApiUrl(relativeUrl: string) {
        return `${environment.apiUrl}/${relativeUrl}`;
    }

    private getAbsoluteWwwUrl(relativeUrl: string) {
        return `${environment.wwwUrl}/${relativeUrl}`;
    }
}
