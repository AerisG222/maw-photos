import { Observable } from 'rxjs';
import { PhotoAndCategory } from '../models/photo-and-category.model';
import { Category } from '../models/category.model';
import { Photo } from '../models/photo.model';
import { ExifDetail } from '../models/exif-detail.model';
import { Rating } from '../models/rating.model';
import { Comment } from '../models/comment.model';
import { YearStats } from '../models/year-stats.model';

export const PHOTO_API_SERVICE = 'PHOTO_API_SERVICE';

export interface PhotoApiService {
    getRandomPhoto(): Observable<PhotoAndCategory>;
    getYears(): Observable<number[]>;
    getCategory(categoryId: number): Observable<Category>;
    getCategoriesForYear(year: number): Observable<Category[]>;
    getPhotosByCategory(categoryId: number): Observable<Photo[]>;
    getPhotosByCommentDate(newestFirst: boolean): Observable<PhotoAndCategory[]>;
    getPhotosByUserCommentDate(newestFirst: boolean): Observable<PhotoAndCategory[]>;
    getPhotosByCommentCount(greatestFirst: boolean): Observable<PhotoAndCategory[]>;
    getPhotosByAverageRating(highestFirst: boolean): Observable<PhotoAndCategory[]>;
    getPhotosByUserRating(highestFirst: boolean): Observable<PhotoAndCategory[]>;
    getPhotoExifData(photoId: number): Observable<ExifDetail>;
    getPhotoRatingData(photoId: number): Observable<Rating>;
    ratePhoto(photoId: number, rating: number): Observable<number>;
    getCommentsForPhoto(photoId: number): Observable<Comment[]>;
    addCommentForPhoto(photoId: number, comment: string): Observable<any>;
    getPhotoStats(): Observable<YearStats[]>;
}
