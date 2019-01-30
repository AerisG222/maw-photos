import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Photo } from '../models/photo.model';
import { ExifDetail } from '../models/exif-detail.model';
import { Rating } from '../models/rating.model';
import { PhotoComment } from '../models/photo-comment.model';

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
