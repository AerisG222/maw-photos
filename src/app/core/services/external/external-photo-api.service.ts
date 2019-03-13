import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { EnvironmentConfig } from 'src/app/core/models/environment-config.model';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Comment } from 'src/app/core/models/comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { PhotoApiService } from '../photo-api.service';
import { ApiCollection } from '../../models/api-collection.model';

@Injectable()
export class ExternalPhotoApiService implements PhotoApiService {
    constructor(
        private _http: HttpClient,
        private _cfg: EnvironmentConfig
    ) {

    }

    getRandomPhoto(): Observable<Photo> {
        const url = this.getAbsoluteUrl('photos/random');

        return this._http
            .get<Photo>(url);
    }

    getRandomPhotos(count: number): Observable<ApiCollection<Photo>> {
        const url = this.getAbsoluteUrl(`photos/random/${count}`);

        return this._http
            .get<ApiCollection<Photo>>(url);
    }


    getCategory(categoryId: number): Observable<PhotoCategory> {
        const url = this.getAbsoluteUrl(`photo-categories/${categoryId}`);

        return this._http
            .get<PhotoCategory>(url);
    }

    getCategories(): Observable<ApiCollection<PhotoCategory>> {
        const url = this.getAbsoluteUrl('photo-categories');

        return this._http
            .get<ApiCollection<PhotoCategory>>(url);
    }

    getPhotosByCategory(categoryId: number): Observable<ApiCollection<Photo>> {
        const url = this.getAbsoluteUrl(`photo-categories/${categoryId}/photos`);

        return this._http
            .get<ApiCollection<Photo>>(url);
    }

    getExifData(photoId: number): Observable<ExifDetail> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/exif`);

        return this._http
            .get<ExifDetail>(url);
    }

    getRating(photoId: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/rating`);

        return this._http
            .get<Rating>(url);
    }

    ratePhoto(photoId: number, rating: number): Observable<number> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/rating`);

        return this._http
            .patch<number>(url, { photoId: photoId, rating: rating });
    }

    getComments(photoId: number): Observable<ApiCollection<Comment>> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/comments`);

        return this._http
            .get<ApiCollection<Comment>>(url)
            .pipe(
                map(comments => {
                    // deal with dates
                    return {
                        count: comments.count,
                        items: comments.items
                            .map((x: Comment) => {
                                x.entryDate = new Date(x.entryDate.toString());
                                return x;
                            })
                        };
                })
            );
    }

    addComment(photoId: number, comment: string): Observable<any> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/comments`);

        return this._http
            .post(url, { photoId: photoId, comment: comment });
    }

    private getAbsoluteUrl(relativeUrl: string) {
        return `${this._cfg.apiUrl}/${relativeUrl}`;
    }
}
