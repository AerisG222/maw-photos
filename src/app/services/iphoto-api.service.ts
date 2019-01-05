import { Observable } from 'rxjs';
import { IPhotoAndCategory } from '../models/iphoto-and-category.model';
import { ICategory } from '../models/icategory.model';
import { IPhoto } from '../models/iphoto.model';
import { IExifDetail } from '../models/iexif-detail.model';
import { IRating } from '../models/irating.model';
import { IComment } from '../models/icomment.model';
import { IYearStats } from '../models/iyear-stats.model';

export const PHOTO_API_SERVICE = 'PHOTO_API_SERVICE';

export interface IPhotoApiService {
    getRandomPhoto(): Observable<IPhotoAndCategory>;
    getYears(): Observable<number[]>;
    getCategory(categoryId: number): Observable<ICategory>;
    getCategoriesForYear(year: number): Observable<ICategory[]>;
    getPhotosByCategory(categoryId: number): Observable<IPhoto[]>;
    getPhotosByCommentDate(newestFirst: boolean): Observable<IPhotoAndCategory[]>;
    getPhotosByUserCommentDate(newestFirst: boolean): Observable<IPhotoAndCategory[]>;
    getPhotosByCommentCount(greatestFirst: boolean): Observable<IPhotoAndCategory[]>;
    getPhotosByAverageRating(highestFirst: boolean): Observable<IPhotoAndCategory[]>;
    getPhotosByUserRating(highestFirst: boolean): Observable<IPhotoAndCategory[]>;
    getPhotoExifData(photoId: number): Observable<IExifDetail>;
    getPhotoRatingData(photoId: number): Observable<IRating>;
    ratePhoto(photoId: number, rating: number): Observable<number>;
    getCommentsForPhoto(photoId: number): Observable<IComment[]>;
    addCommentForPhoto(photoId: number, comment: string): Observable<any>;
    getPhotoStats(): Observable<IYearStats[]>;
}
