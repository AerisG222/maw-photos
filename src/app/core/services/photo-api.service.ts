import { Observable } from 'rxjs';

import { Category } from 'src/app/core/models/category.model';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
import { Rating } from 'src/app/core/models/rating.model';

export const photoApiServiceToken = 'PhotoApiService';

export interface PhotoApiService {
    getRandomPhoto(): Observable<Photo>;
    getYears(): Observable<number[]>;
    getCategory(categoryId: number): Observable<Category>;
    getCategoriesForYear(year: number): Observable<Category[]>;
    getPhotosByCategory(categoryId: number): Observable<Photo[]>;
    getPhotosByCommentDate(newestFirst: boolean): Observable<Photo[]>;
    getPhotosByUserCommentDate(newestFirst: boolean): Observable<Photo[]>;
    getPhotosByCommentCount(greatestFirst: boolean): Observable<Photo[]>;
    getPhotosByAverageRating(highestFirst: boolean): Observable<Photo[]>;
    getPhotosByUserRating(highestFirst: boolean): Observable<Photo[]>;
    getPhotoExifData(photoId: number): Observable<ExifDetail>;
    getPhotoRatingData(photoId: number): Observable<Rating>;
    ratePhoto(photoId: number, rating: number): Observable<number>;
    getCommentsForPhoto(photoId: number): Observable<PhotoComment[]>;
    addCommentForPhoto(photoId: number, comment: string): Observable<any>;
}
