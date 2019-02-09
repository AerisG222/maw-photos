import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Category } from 'src/app/core/models/category.model';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { assetPathServiceToken, AssetPathService } from '../asset-path.service';
import { PhotoApiService } from '../photo-api.service';

@Injectable()
export class MockPhotoApiService implements PhotoApiService {
    private _years: number[];
    private _categories: Category[];
    private _photos: Photo[];

    constructor(@Inject(assetPathServiceToken) private _pathSvc: AssetPathService) {
        this.initData();
    }

    getRandomPhoto(): Observable<Photo> {
        const rand = Math.floor(Math.random() * (this._photos.length - 1));

        return of(this._photos[rand]);
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

    getPhotosByCommentDate(newestFirst: boolean): Observable<Photo[]> {
        throw new Error('not implemented');
    }

    getPhotosByUserCommentDate(newestFirst: boolean): Observable<Photo[]> {
        throw new Error('not implemented');
    }

    getPhotosByCommentCount(greatestFirst: boolean): Observable<Photo[]> {
        throw new Error('not implemented');
    }

    getPhotosByAverageRating(highestFirst: boolean): Observable<Photo[]> {
        throw new Error('not implemented');
    }

    getPhotosByUserRating(highestFirst: boolean): Observable<Photo[]> {
        throw new Error('not implemented');
    }

    getPhotoExifData(photoId: number): Observable<ExifDetail> {
        return of({
            bitsPerSample: 8,
            compression: 'JPEG (old-style)',
            contrast: 'Normal',
            createDate: '2019-01-13T14:58:26',
            digitalZoomRatio: 0.0,
            exposureCompensation: '0',
            exposureMode: 'Auto',
            exposureProgram: 'Program AE',
            exposureTime: '1/30',
            fNumber: 1.8,
            flash: 'Auto, Did not fire',
            focalLength: 4.4590001106262207,
            focalLengthIn35mmFormat: 27.0,
            gainControl: null,
            gpsAltitude: 152.19000244140625,
            gpsAltitudeRef: null,
            gpsDateStamp: null,
            gpsDirection: null,
            gpsDirectionRef: null,
            gpsLatitude: 42.462211608886719,
            gpsLatitudeRef: 'North',
            gpsLongitude: -71.484710693359375,
            gpsLongitudeRef: 'West',
            gpsMeasureMode: null,
            gpsSatellites: null,
            gpsStatus: null,
            gpsVersionId: '2.2.0.0',
            iso: 644,
            lightSource: null,
            make: 'Google',
            meteringMode: 'Center-weighted average',
            model: 'Pixel 2 XL',
            orientation: 'Horizontal (normal)',
            saturation: 'Normal',
            sceneCaptureType: 'Standard',
            sceneType: 'Directly photographed',
            sensingMethod: 'One-chip color area',
            sharpness: 'Normal',
            autoFocusAreaMode: null,
            autoFocusPoint: null,
            activeDLighting: null,
            colorspace: 'sRGB',
            exposureDifference: null,
            flashColorFilter: null,
            flashCompensation: null,
            flashControlMode: null,
            flashExposureCompensation: null,
            flashFocalLength: null,
            flashMode: null,
            flashSetting: null,
            flashType: null,
            focusDistance: null,
            focusMode: null,
            focusPosition: null,
            highIsoNoiseReduction: null,
            hueAdjustment: null,
            noiseReduction: null,
            pictureControlName: null,
            primaryAFPoint: null,
            vrMode: null,
            vibrationReduction: null,
            vignetteControl: null,
            whiteBalance: 'Auto',
            aperture: 1.8,
            autoFocus: null,
            depthOfField: '0.28 m (0.44 - 0.72 m)',
            fieldOfView: '67.4 deg',
            hyperfocalDistance: 2.2260673046112061,
            lensId: null,
            lightValue: 3.9173538684844971,
            scaleFactor35Efl: 6.0551691055297852,
            shutterSpeed: '1/30'
        });
    }

    getPhotoRatingData(photoId: number): Observable<Rating> {
        return of({ userRating: 2, averageRating: 4 });
    }

    ratePhoto(photoId: number, rating: number): Observable<number> {
        return of(4.5);
    }

    getCommentsForPhoto(photoId: number): Observable<PhotoComment[]> {
        return of(​[
            { entryDate: new Date('2012-11-15T14:50:45'), commentText: 'another test', username: 'mmorano' },
            { entryDate: new Date('2012-10-15T14:50:45'), commentText: 'a test', username: 'mmorano' }
        ]);
    }

    addCommentForPhoto(photoId: number, comment: string): Observable<any> {
        return of(true);
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
