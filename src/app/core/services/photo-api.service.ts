import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Comment } from 'src/app/core/models/comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { ApiCollection } from '../models/api-collection.model';
import { GpsCoordinate } from '../models/gps-coordinate.model';
import { GpsDetail } from '../models/gps-detail.model';

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
    addComment(photoId: number, comment: string): Observable<any>;
    setTeaser(categoryId: number, photoId: number): Observable<PhotoCategory>;
    getGpsDetail(photoId: number): Observable<GpsDetail>;
    setGpsCoordinateOverride(photoId: number, latLng: GpsCoordinate): Observable<GpsDetail>;
}
