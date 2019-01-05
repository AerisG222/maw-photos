import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPhotoApiService } from './iphoto-api.service';
import { IPhotoAndCategory } from '../models/iphoto-and-category.model';
import { ICategory } from '../models/icategory.model';
import { IPhoto } from '../models/iphoto.model';
import { IExifDetail } from '../models/iexif-detail.model';
import { IRating } from '../models/irating.model';
import { IComment } from '../models/icomment.model';
import { IYearStats } from '../models/iyear-stats.model';

@Injectable()
export class MockPhotoApiService implements IPhotoApiService {
    getRandomPhoto(): Observable<IPhotoAndCategory> {
        throw new Error('not implemented');
    }

    getYears(): Observable<number[]> {
        throw new Error('not implemented');
    }

    getCategory(categoryId: number): Observable<ICategory> {
        throw new Error('not implemented');
    }

    getCategoriesForYear(year: number): Observable<ICategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByCategory(categoryId: number): Observable<IPhoto[]> {
        throw new Error('not implemented');
    }

    getPhotosByCommentDate(newestFirst: boolean): Observable<IPhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByUserCommentDate(newestFirst: boolean): Observable<IPhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByCommentCount(greatestFirst: boolean): Observable<IPhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByAverageRating(highestFirst: boolean): Observable<IPhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByUserRating(highestFirst: boolean): Observable<IPhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotoExifData(photoId: number): Observable<IExifDetail> {
        throw new Error('not implemented');
    }

    getPhotoRatingData(photoId: number): Observable<IRating> {
        throw new Error('not implemented');
    }

    ratePhoto(photoId: number, rating: number): Observable<number> {
        throw new Error('not implemented');
    }

    getCommentsForPhoto(photoId: number): Observable<IComment[]> {
        throw new Error('not implemented');
    }

    addCommentForPhoto(photoId: number, comment: string): Observable<any> {
        throw new Error('not implemented');
    }

    getPhotoStats(): Observable<IYearStats[]> {
        throw new Error('not implemented');
    }
}
