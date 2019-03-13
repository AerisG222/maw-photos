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
import { DateService } from '../date.service';

@Injectable()
export class ExternalPhotoApiService implements PhotoApiService {
    constructor(
        private _http: HttpClient,
        private _cfg: EnvironmentConfig,
        private _dateSvc: DateService
    ) {

    }

    getRandomPhoto(): Observable<Photo> {
        const url = this.getAbsoluteUrl('photos/random');

        return this._http
            .get<Photo>(url)
            .pipe(
                map(p => this.cleanupPhoto(p))
            );
    }

    getRandomPhotos(count: number): Observable<ApiCollection<Photo>> {
        const url = this.getAbsoluteUrl(`photos/random/${count}`);

        return this._http
            .get<ApiCollection<Photo>>(url)
            .pipe(
                map(p => this.cleanupPhotos(p))
            );
    }


    getCategory(categoryId: number): Observable<PhotoCategory> {
        const url = this.getAbsoluteUrl(`photo-categories/${categoryId}`);

        return this._http
            .get<PhotoCategory>(url)
            .pipe(
                map(p => this.cleanupPhotoCategory(p))
            );
    }

    getCategories(): Observable<ApiCollection<PhotoCategory>> {
        const url = this.getAbsoluteUrl('photo-categories');

        return this._http
            .get<ApiCollection<PhotoCategory>>(url)
            .pipe(
                map(p => this.cleanupPhotoCategories(p))
            );
    }

    getPhotosByCategory(categoryId: number): Observable<ApiCollection<Photo>> {
        const url = this.getAbsoluteUrl(`photo-categories/${categoryId}/photos`);

        return this._http
            .get<ApiCollection<Photo>>(url)
            .pipe(
                map(p => this.cleanupPhotos(p))
            );
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
                map(comments => this.cleanupComments(comments))
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

    private cleanupPhotoCategories(categories: ApiCollection<PhotoCategory>): ApiCollection<PhotoCategory> {
        return {
            count: categories.count,
            items: categories.items.map(c => this.cleanupPhotoCategory(c))
        };
    }

    private cleanupPhotoCategory(category: PhotoCategory): PhotoCategory {
        category.createDate = this._dateSvc.safeParse(category.createDate);

        return category;
    }

    private cleanupPhotos(photos: ApiCollection<Photo>): ApiCollection<Photo> {
        return {
            count: photos.count,
            items: photos.items.map(p => this.cleanupPhoto(p))
        };
    }

    private cleanupPhoto(photo: Photo): Photo {
        photo.createDate = this._dateSvc.safeParse(photo.createDate);

        return photo;
    }

    private cleanupComments(comments: ApiCollection<Comment>): ApiCollection<Comment> {
        return {
            count: comments.count,
            items: comments.items.map(c => this.cleanupComment(c))
        };
    }

    private cleanupComment(comment: Comment): Comment {
        comment.entryDate = this._dateSvc.safeParse(comment.entryDate);

        return comment;
    }
}
