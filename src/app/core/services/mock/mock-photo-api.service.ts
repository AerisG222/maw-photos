import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PhotoApiService } from '../photo-api.service';
import { PhotoAndCategory } from '../../models/photo-and-category.model';
import { Category } from '../../models/category.model';
import { Photo } from '../../models/photo.model';
import { ExifDetail } from '../../models/exif-detail.model';
import { Rating } from '../../models/rating.model';
import { Comment } from '../../models/comment.model';
import { assetPathServiceToken, AssetPathService } from '../asset-path.service';

@Injectable()
export class MockPhotoApiService implements PhotoApiService {
    private _years: number[];
    private _categories: Category[];
    private _photos: Photo[];

    constructor(@Inject(assetPathServiceToken) private _pathSvc: AssetPathService) {
        this.initData();
    }

    getRandomPhoto(): Observable<PhotoAndCategory> {
        throw new Error('not implemented');
    }

    getYears(): Observable<number[]> {
        return of(this._years);
    }

    getCategory(categoryId: number): Observable<Category> {
        return of(this._categories.filter(x => x.id === categoryId)[0]);
    }

    getCategoriesForYear(year: number): Observable<Category[]> {
        return of(this._categories.filter(x => x.year === year));
    }

    getPhotosByCategory(categoryId: number): Observable<Photo[]> {
        return of(this._photos.filter(x => x.categoryId === categoryId));
    }

    getPhotosByCommentDate(newestFirst: boolean): Observable<PhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByUserCommentDate(newestFirst: boolean): Observable<PhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByCommentCount(greatestFirst: boolean): Observable<PhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByAverageRating(highestFirst: boolean): Observable<PhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotosByUserRating(highestFirst: boolean): Observable<PhotoAndCategory[]> {
        throw new Error('not implemented');
    }

    getPhotoExifData(photoId: number): Observable<ExifDetail> {
        throw new Error('not implemented');
    }

    getPhotoRatingData(photoId: number): Observable<Rating> {
        throw new Error('not implemented');
    }

    ratePhoto(photoId: number, rating: number): Observable<number> {
        throw new Error('not implemented');
    }

    getCommentsForPhoto(photoId: number): Observable<Comment[]> {
        throw new Error('not implemented');
    }

    addCommentForPhoto(photoId: number, comment: string): Observable<any> {
        throw new Error('not implemented');
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
                },
                photoCount: 10
            },
            {
                id: 2,
                name: 'Test 2',
                year: 2018,
                hasGpsData: false,
                teaserPhotoInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test2/xs/DSC_1125.jpg')
                },
                photoCount: 20
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
                },
                photoCount: 30
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
                },
                photoCount: 40
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
                },
                photoCount: 50
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
                },
                photoCount: 60
            }
        ];

        this._photos = [
            {
                id: 1,
                categoryId: 1,
                latitude: null,
                longitude: null,
                xsInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/xs/DSC_1122.jpg')
                },
                smInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/sm/DSC_1122.jpg')
                },
                mdInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/md/DSC_1122.jpg')
                },
                lgInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/lg/DSC_1122.jpg')
                },
                prtInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/prt/DSC_1122.jpg')
                }
            },
            {
                id: 2,
                categoryId: 1,
                latitude: null,
                longitude: null,
                xsInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/xs/DSC_1123.jpg')
                },
                smInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/sm/DSC_1123.jpg')
                },
                mdInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/md/DSC_1123.jpg')
                },
                lgInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/lg/DSC_1123.jpg')
                },
                prtInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/prt/DSC_1123.jpg')
                }
            },
            {
                id: 3,
                categoryId: 1,
                latitude: null,
                longitude: null,
                xsInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/xs/DSC_1124.jpg')
                },
                smInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/sm/DSC_1124.jpg')
                },
                mdInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/md/DSC_1124.jpg')
                },
                lgInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/lg/DSC_1124.jpg')
                },
                prtInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/prt/DSC_1124.jpg')
                }
            },
            {
                id: 4,
                categoryId: 1,
                latitude: null,
                longitude: null,
                xsInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/xs/DSC_1125.jpg')
                },
                smInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/sm/DSC_1125.jpg')
                },
                mdInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/md/DSC_1125.jpg')
                },
                lgInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/lg/DSC_1125.jpg')
                },
                prtInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/prt/DSC_1125.jpg')
                }
            },
            {
                id: 5,
                categoryId: 1,
                latitude: null,
                longitude: null,
                xsInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/xs/DSC_1134.jpg')
                },
                smInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/sm/DSC_1134.jpg')
                },
                mdInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/md/DSC_1134.jpg')
                },
                lgInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/lg/DSC_1134.jpg')
                },
                prtInfo: {
                    height: 400,
                    width: 400,
                    path: this._pathSvc.getPath('/images/2018/test1/prt/DSC_1134.jpg')
                }
            }
        ];
    }
}
