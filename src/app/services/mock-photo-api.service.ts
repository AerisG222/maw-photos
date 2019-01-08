import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IPhotoApiService } from './iphoto-api.service';
import { IPhotoAndCategory } from '../models/iphoto-and-category.model';
import { ICategory } from '../models/icategory.model';
import { IPhoto } from '../models/iphoto.model';
import { IExifDetail } from '../models/iexif-detail.model';
import { IRating } from '../models/irating.model';
import { IComment } from '../models/icomment.model';
import { IYearStats } from '../models/iyear-stats.model';
import { ASSET_PATH_SERVICE, IAssetPathService } from './iasset-path.service';

@Injectable()
export class MockPhotoApiService implements IPhotoApiService {
    private _years: number[];
    private _categories: ICategory[];

    constructor(@Inject(ASSET_PATH_SERVICE) private _pathSvc: IAssetPathService) {
        this.initData();
    }

    getRandomPhoto(): Observable<IPhotoAndCategory> {
        throw new Error('not implemented');
    }

    getYears(): Observable<number[]> {
        return of(this._years);
    }

    getCategory(categoryId: number): Observable<ICategory> {
        return of(this._categories.filter(x => x.id === categoryId)[0]);
    }

    getCategoriesForYear(year: number): Observable<ICategory[]> {
        return of(this._categories.filter(x => x.year === year));
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
        return of([
            { 'year': 2018,
                'categoryStats': [
                    { 'id': 1, 'name': 'Test 1', 'photoCount': 10 },
                    { 'id': 2, 'name': 'Test 2', 'photoCount': 20 },
                    { 'id': 3, 'name': 'Test 3', 'photoCount': 30 },
                    { 'id': 4, 'name': 'Test 4', 'photoCount': 40 },
                    { 'id': 5, 'name': 'Test 5', 'photoCount': 50 },
                    { 'id': 6, 'name': 'Test 6', 'photoCount': 60 }
                ]
            },
            { 'year': 2019,
                'categoryStats': [
                    { 'id': 11, 'name': 'Test 11', 'photoCount': 10 },
                    { 'id': 12, 'name': 'Test 12', 'photoCount': 20 },
                    { 'id': 13, 'name': 'Test 13', 'photoCount': 30 },
                    { 'id': 14, 'name': 'Test 14', 'photoCount': 40 },
                    { 'id': 15, 'name': 'Test 15', 'photoCount': 50 },
                    { 'id': 16, 'name': 'Test 16', 'photoCount': 60 }
                ]
            }
        ]);
    }

    initData(): void {
        this._years = [
            2018,
            2019
        ];

        this._categories = [
            {
                id: 1,
                name: 'Test 1',
                year: 2018,
                hasGpsData: true,
                teaserPhotoInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/xs/DSC_1122.jpg')
                }
            },
            {
                id: 2,
                name: 'Test 2',
                year: 2018,
                hasGpsData: false,
                teaserPhotoInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test2/xs/a.jpg')
                }
            },
            {
                id: 3,
                name: 'Test 3',
                year: 2018,
                hasGpsData: true,
                teaserPhotoInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test3/xs/a.jpg')
                }
            },
            {
                id: 4,
                name: 'Test 4',
                year: 2019,
                hasGpsData: true,
                teaserPhotoInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/xs/a.jpg')
                }
            },
            {
                id: 5,
                name: 'Test 5',
                year: 2019,
                hasGpsData: false,
                teaserPhotoInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test2/xs/a.jpg')
                }
            },
            {
                id: 6,
                name: 'Test 6',
                year: 2019,
                hasGpsData: true,
                teaserPhotoInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test3/xs/a.jpg')
                }
            }
        ];
    }
}
