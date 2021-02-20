import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    PhotoCategory,
    ExifDetail,
    Photo,
    Comment,
    Rating,
    ApiCollection,
    GpsCoordinate,
    GpsDetail,
} from '@models';
import { environment } from 'src/environments/environment';
import { PhotoApiService } from '@core/services';
import { safeParseDate } from 'src/app/models/helpers/date';

@Injectable()
export class ExternalPhotoApiService implements PhotoApiService {
    constructor(private http: HttpClient) {}

    getRandomPhoto(): Observable<Photo> {
        const url = this.getAbsoluteUrl('photos/random');

        return this.http.get<Photo>(url).pipe(map((p) => this.cleanupPhoto(p)));
    }

    getRandomPhotos(count: number): Observable<ApiCollection<Photo>> {
        const url = this.getAbsoluteUrl(`photos/random/${count}`);

        return this.http
            .get<ApiCollection<Photo>>(url)
            .pipe(map((p) => this.cleanupPhotos(p)));
    }

    getCategory(categoryId: number): Observable<PhotoCategory> {
        const url = this.getAbsoluteUrl(`photo-categories/${categoryId}`);

        return this.http
            .get<PhotoCategory>(url)
            .pipe(map((p) => this.cleanupPhotoCategory(p)));
    }

    getCategories(): Observable<ApiCollection<PhotoCategory>> {
        const url = this.getAbsoluteUrl('photo-categories');

        return this.http
            .get<ApiCollection<PhotoCategory>>(url)
            .pipe(map((p) => this.cleanupPhotoCategories(p)));
    }

    getPhotosByCategory(categoryId: number): Observable<ApiCollection<Photo>> {
        const url = this.getAbsoluteUrl(
            `photo-categories/${categoryId}/photos`
        );

        return this.http
            .get<ApiCollection<Photo>>(url)
            .pipe(map((p) => this.cleanupPhotos(p)));
    }

    getExifData(photoId: number): Observable<ExifDetail> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/exif`);

        return this.http.get<ExifDetail>(url);
    }

    getRating(photoId: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/rating`);

        return this.http.get<Rating>(url);
    }

    ratePhoto(photoId: number, rating: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/rating`);

        return this.http.patch<Rating>(url, { photoId, rating });
    }

    getComments(photoId: number): Observable<ApiCollection<Comment>> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/comments`);

        return this.http
            .get<ApiCollection<Comment>>(url)
            .pipe(map((comments) => this.cleanupComments(comments)));
    }

    addComment(
        photoId: number,
        comment: string
    ): Observable<ApiCollection<Comment>> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/comments`);

        return this.http.post<ApiCollection<Comment>>(url, {
            photoId,
            comment,
        });
    }

    getGpsDetail(photoId: number): Observable<GpsDetail> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/gps`);

        return this.http.get<GpsDetail>(url);
    }

    setGpsCoordinateOverride(
        photoId: number,
        gps: GpsCoordinate
    ): Observable<GpsDetail> {
        const url = this.getAbsoluteUrl(`photos/${photoId}/gps`);

        return this.http.patch<GpsDetail>(url, gps);
    }

    setTeaser(categoryId: number, photoId: number): Observable<PhotoCategory> {
        const url = this.getAbsoluteUrl(
            `photo-categories/${categoryId}/teaser`
        );

        return this.http
            .patch<PhotoCategory>(url, { photoId })
            .pipe(map((p) => this.cleanupPhotoCategory(p)));
    }

    private getAbsoluteUrl(relativeUrl: string): string {
        return `${environment.apiUrl}/${relativeUrl}`;
    }

    private cleanupPhotoCategories(
        categories: ApiCollection<PhotoCategory>
    ): ApiCollection<PhotoCategory> {
        return {
            count: categories.count,
            items: categories.items.map((c) => this.cleanupPhotoCategory(c)),
        };
    }

    private cleanupPhotoCategory(category: PhotoCategory): PhotoCategory {
        category.createDate = safeParseDate(category.createDate);

        return category;
    }

    private cleanupPhotos(photos: ApiCollection<Photo>): ApiCollection<Photo> {
        return {
            count: photos.count,
            items: photos.items.map((p) => this.cleanupPhoto(p)),
        };
    }

    private cleanupPhoto(photo: Photo): Photo {
        photo.createDate = safeParseDate(photo.createDate);

        return photo;
    }

    private cleanupComments(
        comments: ApiCollection<Comment>
    ): ApiCollection<Comment> {
        return {
            count: comments.count,
            items: comments.items.map((c) => this.cleanupComment(c)),
        };
    }

    private cleanupComment(comment: Comment): Comment {
        comment.entryDate = safeParseDate(comment.entryDate);

        return comment;
    }
}
