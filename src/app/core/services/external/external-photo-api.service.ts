import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { Category } from 'src/app/core/models/category.model';
import { EnvironmentConfig } from 'src/app/core/models/environment-config';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { PhotoApiService } from '../photo-api.service';
import { assetPathServiceToken, AssetPathService } from '../asset-path.service';

@Injectable()
export class ExternalPhotoApiService implements PhotoApiService {
    constructor(
        private _http: HttpClient,
        private _cfg: EnvironmentConfig,
        @Inject(assetPathServiceToken) private _pathSvc: AssetPathService) {

    }

    getRandomPhoto(): Observable<Photo> {
        const url = this.getAbsoluteUrl('photos/getRandomPhoto');

        return this._http
            .get<Photo>(url);
    }

    getYears(): Observable<number[]> {
        const url = this.getAbsoluteUrl('photos/getPhotoYears');

        return this._http
            .get<number[]>(url);
    }

    getCategory(categoryId: number): Observable<Category> {
        const url = this.getAbsoluteUrl(`photos/getCategory/${categoryId}`);

        return this._http
            .get<Category>(url);
    }

    getCategoriesForYear(year: number): Observable<Category[]> {
        const url = this.getAbsoluteUrl(`photos/getCategoriesForYear/${year}`);

        return this._http
            .get<Category[]>(url);
    }

    getPhotosByCategory(categoryId: number): Observable<Photo[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosByCategory/${categoryId}`);

        return this._http
            .get<Photo[]>(url);
    }

    getPhotosByCommentDate(newestFirst: boolean): Observable<Photo[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByCommentDate/${newestFirst}`);

        return this._http
            .get<Photo[]>(url);
    }

    getPhotosByUserCommentDate(newestFirst: boolean): Observable<Photo[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByUserCommentDate/${newestFirst}`);

        return this._http
            .get<Photo[]>(url);
    }

    getPhotosByCommentCount(greatestFirst: boolean): Observable<Photo[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByCommentCount/${greatestFirst}`);

        return this._http
            .get<Photo[]>(url);
    }

    getPhotosByAverageRating(highestFirst: boolean): Observable<Photo[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByAverageRating/${highestFirst}`);

        return this._http
            .get<Photo[]>(url);
    }

    getPhotosByUserRating(highestFirst: boolean): Observable<Photo[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByUserRating/${highestFirst}`);

        return this._http
            .get<Photo[]>(url);
    }

    getPhotoExifData(photoId: number): Observable<ExifDetail> {
        const url = this.getAbsoluteUrl(`photos/getPhotoExifData/${photoId}`);

        return this._http
            .get<ExifDetail>(url);
    }

    getPhotoRatingData(photoId: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`photos/getRatingForPhoto/${photoId}`);

        return this._http
            .get<Rating>(url);
    }

    ratePhoto(photoId: number, rating: number): Observable<number> {
        const url = this.getAbsoluteUrl('photos/ratePhoto');

        return this._http
            .post<number>(url, { photoId: photoId, rating: rating });
    }

    getCommentsForPhoto(photoId: number): Observable<PhotoComment[]> {
        const url = this.getAbsoluteUrl(`photos/getCommentsForPhoto/${photoId}`);

        return Observable.create((observer: Observer<PhotoComment[]>) => {
            this._http
                .get<PhotoComment[]>(url)
                .subscribe(comments => {
                    // deal with dates
                    const c = comments.map((x: PhotoComment) => {
                        x.entryDate = new Date(x.entryDate.toString());
                        return x;
                    });

                    observer.next(c);
                    observer.complete();
                });
        });
    }

    addCommentForPhoto(photoId: number, comment: string): Observable<any> {
        const url = this.getAbsoluteUrl('photos/addCommentForPhoto');

        return this._http
            .post(url, { photoId: photoId, comment: comment });
    }

    private getAbsoluteUrl(relativeUrl: string) {
        return `${this._cfg.apiUrl}/${relativeUrl}`;
    }
}
