import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

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

export const photoApiServiceToken = new InjectionToken<PhotoApiService>('PhotoApiService');

export interface PhotoApiService {
    getCategories(): Observable<ApiCollection<PhotoCategory>>;
    getCategory(categoryId: number): Observable<PhotoCategory>;
    getPhotosByCategory(categoryId: number): Observable<ApiCollection<Photo>>;
    getRandomPhoto(): Observable<Photo>;
    getRandomPhotos(count: number): Observable<ApiCollection<Photo>>;
    getComments(photoId: number): Observable<ApiCollection<Comment>>;
    getExifData(photoId: number): Observable<ExifDetail>;
    getRating(photoId: number): Observable<Rating>;
    ratePhoto(photoId: number, rating: number): Observable<Rating>;
    addComment(photoId: number, comment: string): Observable<ApiCollection<Comment>>;
    setTeaser(categoryId: number, photoId: number): Observable<PhotoCategory>;
    getGpsDetail(photoId: number): Observable<GpsDetail>;
    setGpsCoordinateOverride(photoId: number, latLng: GpsCoordinate): Observable<GpsDetail>;
}
