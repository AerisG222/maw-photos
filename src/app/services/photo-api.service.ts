import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { EnvironmentConfig } from '../models/environment-config';
import { IPhotoAndCategory } from '../models/iphoto-and-category.model';
import { ICategory } from '../models/icategory.model';
import { IPhoto } from '../models/iphoto.model';
import { IExifDetail } from '../models/iexif-detail.model';
import { IRating } from '../models/irating.model';
import { IComment } from '../models/icomment.model';
import { IYearStats } from '../models/iyear-stats.model';
import { IPhotoApiService } from './iphoto-api.service';

@Injectable()
export class PhotoApiService implements IPhotoApiService {
    constructor(
        private _http: HttpClient,
        private _cfg: EnvironmentConfig) {

    }

    getRandomPhoto(): Observable<IPhotoAndCategory> {
        const url = this.getAbsoluteUrl('photos/getRandomPhoto');

        return this._http
            .get<IPhotoAndCategory>(url);
    }

    getYears(): Observable<number[]> {
        const url = this.getAbsoluteUrl('photos/getPhotoYears');

        return this._http
            .get<number[]>(url);
    }

    getCategory(categoryId: number): Observable<ICategory> {
        const url = this.getAbsoluteUrl(`photos/getCategory/${categoryId}`);

        return this._http
            .get<ICategory>(url);
    }

    getCategoriesForYear(year: number): Observable<ICategory[]> {
        const url = this.getAbsoluteUrl(`photos/getCategoriesForYear/${year}`);

        return this._http
            .get<ICategory[]>(url);
    }

    getPhotosByCategory(categoryId: number): Observable<IPhoto[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosByCategory/${categoryId}`);

        return this._http
            .get<IPhoto[]>(url);
    }

    getPhotosByCommentDate(newestFirst: boolean): Observable<IPhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByCommentDate/${newestFirst}`);

        return this._http
            .get<IPhotoAndCategory[]>(url);
    }

    getPhotosByUserCommentDate(newestFirst: boolean): Observable<IPhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByUserCommentDate/${newestFirst}`);

        return this._http
            .get<IPhotoAndCategory[]>(url);
    }

    getPhotosByCommentCount(greatestFirst: boolean): Observable<IPhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByCommentCount/${greatestFirst}`);

        return this._http
            .get<IPhotoAndCategory[]>(url);
    }

    getPhotosByAverageRating(highestFirst: boolean): Observable<IPhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByAverageRating/${highestFirst}`);

        return this._http
            .get<IPhotoAndCategory[]>(url);
    }

    getPhotosByUserRating(highestFirst: boolean): Observable<IPhotoAndCategory[]> {
        const url = this.getAbsoluteUrl(`photos/getPhotosAndCategoriesByUserRating/${highestFirst}`);

        return this._http
            .get<IPhotoAndCategory[]>(url);
    }

    getPhotoExifData(photoId: number): Observable<IExifDetail> {
        const url = this.getAbsoluteUrl(`photos/getPhotoExifData/${photoId}`);

        return this._http
            .get<IExifDetail>(url);
    }

    getPhotoRatingData(photoId: number): Observable<IRating> {
        const url = this.getAbsoluteUrl(`photos/getRatingForPhoto/${photoId}`);

        return this._http
            .get<IRating>(url);
    }

    ratePhoto(photoId: number, rating: number): Observable<number> {
        const url = this.getAbsoluteUrl('photos/ratePhoto');

        return this._http
            .post<number>(url, { photoId: photoId, rating: rating });
    }

    getCommentsForPhoto(photoId: number): Observable<IComment[]> {
        const url = this.getAbsoluteUrl(`photos/getCommentsForPhoto/${photoId}`);

        return Observable.create((observer: Observer<IComment[]>) => {
            this._http
                .get<IComment[]>(url)
                .subscribe(comments => {
                    // deal with dates
                    const c = comments.map((x: IComment) => {
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

    getPhotoStats(): Observable<IYearStats[]> {
        const url = this.getAbsoluteUrl('photos/getStats');

        return this._http
            .get<IYearStats[]>(url);
    }

    private getAbsoluteUrl(relativeUrl: string) {
        return `${this._cfg.apiUrl}/${relativeUrl}`;
    }
}
