import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { EnvironmentConfig } from '../../models/environment-config';
import { PhotoAndCategory } from '../../models/photo-and-category.model';
import { Category } from '../../models/category.model';
import { Photo } from '../../models/photo.model';
import { ExifDetail } from '../../models/exif-detail.model';
import { Rating } from '../../models/rating.model';
import { Comment } from '../../models/comment.model';
import { PhotoApiService } from '../photo-api.service';
import { assetPathServiceToken, AssetPathService } from '../asset-path.service';

@Injectable()
export class ExternalPhotoApiService implements PhotoApiService {
    constructor(
        private _http: HttpClient,
        private _cfg: EnvironmentConfig,
        @Inject(assetPathServiceToken) private _pathSvc: AssetPathService) {

    }

    getRandomPhoto(): Observable<PhotoAndCategory> {
        const url = this.getAbsoluteUrl('photos/getRandomPhoto');

        return this._http
            .get<PhotoAndCategory>(url);
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

    getPhotosByCommentDate(newestFirst: boolean): Observable<PhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByCommentDate/${newestFirst}`);

        return this._http
            .get<PhotoAndCategory[]>(url);
    }

    getPhotosByUserCommentDate(newestFirst: boolean): Observable<PhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByUserCommentDate/${newestFirst}`);

        return this._http
            .get<PhotoAndCategory[]>(url);
    }

    getPhotosByCommentCount(greatestFirst: boolean): Observable<PhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByCommentCount/${greatestFirst}`);

        return this._http
            .get<PhotoAndCategory[]>(url);
    }

    getPhotosByAverageRating(highestFirst: boolean): Observable<PhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByAverageRating/${highestFirst}`);

        return this._http
            .get<PhotoAndCategory[]>(url);
    }

    getPhotosByUserRating(highestFirst: boolean): Observable<PhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByUserRating/${highestFirst}`);

        return this._http
            .get<PhotoAndCategory[]>(url);
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

    getCommentsForPhoto(photoId: number): Observable<Comment[]> {
        const url = this.getAbsoluteUrl(`photos/getCommentsForPhoto/${photoId}`);

        return Observable.create((observer: Observer<Comment[]>) => {
            this._http
                .get<Comment[]>(url)
                .subscribe(comments => {
                    // deal with dates
                    const c = comments.map((x: Comment) => {
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
