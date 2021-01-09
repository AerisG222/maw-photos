import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PhotoCategory } from '@models/photo-category.model';
import { ExifDetail } from '@models/exif-detail.model';
import { Photo } from '@models/photo.model';
import { Comment } from '@models/comment.model';
import { Rating } from '@models/rating.model';
import { PhotoApiService } from 'src/app/core/services/photo-api.service';
import { ApiCollection } from '@models/api-collection.model';
import { DateService } from 'src/app/core/services/date.service';
import { GpsCoordinate } from '@models/gps-coordinate.model';
import { GpsDetail } from '@models/gps-detail.model';

@Injectable()
export class MockPhotoApiService implements PhotoApiService {
    private categories: PhotoCategory[];
    private photos: Photo[];

    constructor(
        private dateSvc: DateService
    ) {
        this.initData();
    }

    getRandomPhoto(): Observable<Photo> {
        const rand = Math.floor(Math.random() * (this.photos.length - 1));

        return of(this.photos[rand]);
    }

    getRandomPhotos(count: number): Observable<ApiCollection<Photo>> {
        const photos = [];

        for (let i = 0; i < count; i++) {
            const rand = Math.floor(Math.random() * (this.photos.length - 1));

            photos.push(this.photos[rand]);
        }

        return of({
            count: photos.length,
            items: photos
        });
    }

    getCategory(categoryId: number): Observable<PhotoCategory> {
        return of(this.categories.filter(x => x.id === categoryId)[0]);
    }

    getCategories(): Observable<ApiCollection<PhotoCategory>> {
        return of({
            count: this.categories.length,
            items: this.categories
        });
    }

    getPhotosByCategory(categoryId: number): Observable<ApiCollection<Photo>> {
        const photos = this.photos
            .filter(x => x.categoryId === categoryId);

        return of({
            count: photos.length,
            items: photos
        });
    }

    getExifData(photoId: number): Observable<ExifDetail> {
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
            gpsLatitude: 43,
            gpsLatitudeRef: 'North',
            gpsLongitude: -72,
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

    getRating(photoId: number): Observable<Rating> {
        return of({ userRating: 2, averageRating: 4 });
    }

    ratePhoto(photoId: number, rating: number): Observable<Rating> {
        return of({ userRating: 3, averageRating: 4.5 });
    }

    getComments(photoId: number): Observable<ApiCollection<Comment>> {
        return of(​{
            count: 2,
            items: [
                { entryDate: new Date('2012-11-15T14:50:45'), commentText: 'another test', username: 'mmorano' },
                { entryDate: new Date('2012-10-15T14:50:45'), commentText: 'a test', username: 'mmorano' }
            ]
        });
    }

    addComment(photoId: number, comment: string): Observable<ApiCollection<Comment>> {
        return this.getComments(photoId);
    }

    getGpsDetail(videoId: number): Observable<GpsDetail> {
        return of({
            source: { latitude: 43.12345, longitude: -72.67890 },
            override: { latitude: 43.11111, longitude: -72.55555 }
        });
    }

    setGpsCoordinateOverride(photoId: number, latLng: GpsCoordinate): Observable<GpsDetail> {
        return this.getGpsDetail(photoId);
    }

    setTeaser(categoryId: number, photoId: number): Observable<PhotoCategory> {
        return this.getCategory(1);
    }

    private initData(): void {
        this.categories = [
            {
                id: 1,
                name: 'Test 1',
                year: 2018,
                createDate: new Date('2018-01-01'),
                latitude: 43,
                longitude: -72,
                photoCount: 150,
                totalSizeXs: 10000,
                totalSizeXsSq: 20000,
                totalSizeSm: 30000,
                totalSizeMd: 40000,
                totalSizeLg: 50000,
                totalSizePrt: 60000,
                totalSizeSrc: 70000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test1/xs/DSC_1122.jpg',
                    size: 2000
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test1/xs/DSC_1122.jpg',
                    size: 2000
                },
                self: '/photo-categories/1',
                photosLink: '/photo-categories/1/photos',
                downloadLink: '/photos/download-category/1',
                isMissingGpsData: false
            },
            {
                id: 2,
                name: 'Test 2',
                year: 2018,
                createDate: new Date('2018-02-01'),
                latitude: null,
                longitude: null,
                photoCount: 150,
                totalSizeXs: 10000,
                totalSizeXsSq: 20000,
                totalSizeSm: 30000,
                totalSizeMd: 40000,
                totalSizeLg: 50000,
                totalSizePrt: 60000,
                totalSizeSrc: 70000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test2/xs/DSC_1125.jpg',
                    size: 200
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test2/xs/DSC_1125.jpg',
                    size: 2000
                },
                self: '/photo-categories/2',
                photosLink: '/photo-categories/2/photos',
                downloadLink: '/photos/download-category/2',
                isMissingGpsData: false
            },
            {
                id: 3,
                name: 'Test 3',
                year: 2018,
                createDate: new Date('2018-03-01'),
                latitude: null,
                longitude: null,
                photoCount: 150,
                totalSizeXs: 10000,
                totalSizeXsSq: 20000,
                totalSizeSm: 30000,
                totalSizeMd: 40000,
                totalSizeLg: 50000,
                totalSizePrt: 60000,
                totalSizeSrc: 70000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test3/xs/a.jpg',
                    size: 2000
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test3/xs/a.jpg',
                    size: 2000
                },
                self: '/photo-categories/3',
                photosLink: '/photo-categories/3/photos',
                downloadLink: '/photos/download-category/3',
                isMissingGpsData: true
            },
            {
                id: 4,
                name: 'Test 4',
                year: 2019,
                createDate: new Date('2018-04-01'),
                latitude: null,
                longitude: null,
                photoCount: 150,
                totalSizeXs: 10000,
                totalSizeXsSq: 20000,
                totalSizeSm: 30000,
                totalSizeMd: 40000,
                totalSizeLg: 50000,
                totalSizePrt: 60000,
                totalSizeSrc: 70000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test4/xs/a.jpg',
                    size: 2000
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test4/xs/a.jpg',
                    size: 2000
                },
                self: '/photo-categories/4',
                photosLink: '/photo-categories/4/photos',
                downloadLink: '/photos/download-category/4',
                isMissingGpsData: false
            },
            {
                id: 5,
                name: 'Test 5',
                year: 2019,
                createDate: new Date('2018-05-01'),
                latitude: null,
                longitude: null,
                photoCount: 150,
                totalSizeXs: 10000,
                totalSizeXsSq: 20000,
                totalSizeSm: 30000,
                totalSizeMd: 40000,
                totalSizeLg: 50000,
                totalSizePrt: 60000,
                totalSizeSrc: 70000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test5/xs/a.jpg',
                    size: 2000
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test5/xs/a.jpg',
                    size: 2000
                },
                self: '/photo-categories/5',
                photosLink: '/photo-categories/5/photos',
                downloadLink: '/photos/download-category/5',
                isMissingGpsData: true
            },
            {
                id: 6,
                name: 'Test 6',
                year: 2019,
                createDate: new Date('2018-06-01'),
                latitude: null,
                longitude: null,
                photoCount: 150,
                totalSizeXs: 10000,
                totalSizeXsSq: 20000,
                totalSizeSm: 30000,
                totalSizeMd: 40000,
                totalSizeLg: 50000,
                totalSizePrt: 60000,
                totalSizeSrc: 70000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test6/xs/a.jpg',
                    size: 2000
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/images/2018/test6/xs/a.jpg',
                    size: 2000
                },
                self: '/photo-categories/6',
                photosLink: '/photo-categories/6/photos',
                downloadLink: '/photos/download-category/6',
                isMissingGpsData: true
            }
        ];

        this.photos = [
            {
                id: 1,
                categoryId: 1,
                createDate: new Date('2018-01-01'),
                latitude: 43,
                longitude: -72,
                imageXs: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs/DSC_1122.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs/DSC_1122.jpg'
                },
                imageXsSq: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs_sq/DSC_1122.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs_sq/DSC_1122.jpg'
                },
                imageSm: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/sm/DSC_1122.jpg',
                    downloadUrl: '/assets/images/2018/test1/sm/DSC_1122.jpg'
                },
                imageMd: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/md/DSC_1122.jpg',
                    downloadUrl: '/assets/images/2018/test1/md/DSC_1122.jpg'
                },
                imageLg: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/lg/DSC_1122.jpg',
                    downloadUrl: '/assets/images/2018/test1/lg/DSC_1122.jpg'
                },
                imagePrt: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1122.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1122.jpg'
                },
                imageSrc: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/src/DSC_1122.jpg',
                    downloadUrl: '/assets/images/2018/test1/src/DSC_1122.jpg'
                },
                self: '/photos/1',
                categoryLink: '/photo-categories/1',
                commentsLink: '/photos/1/comments',
                exifLink: '/photos/1/exif',
                ratingLink: '/photos/1/rating'
            },
            {
                id: 2,
                categoryId: 1,
                createDate: new Date('2018-01-02'),
                latitude: 43.1,
                longitude: -72.1,
                imageXs: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs/DSC_1123.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs/DSC_1123.jpg'
                },
                imageXsSq: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs_sq/DSC_1123.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs_sq/DSC_1123.jpg'
                },
                imageSm: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/sm/DSC_1123.jpg',
                    downloadUrl: '/assets/images/2018/test1/sm/DSC_1123.jpg'
                },
                imageMd: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/md/DSC_1123.jpg',
                    downloadUrl: '/assets/images/2018/test1/md/DSC_1123.jpg'
                },
                imageLg: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/lg/DSC_1123.jpg',
                    downloadUrl: '/assets/images/2018/test1/lg/DSC_1123.jpg'
                },
                imagePrt: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1123.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1123.jpg'
                },
                imageSrc: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1123.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1123.jpg'
                },
                self: '/photos/2',
                categoryLink: '/photo-categories/1',
                commentsLink: '/photos/2/comments',
                exifLink: '/photos/2/exif',
                ratingLink: '/photos/2/rating'
            },
            {
                id: 3,
                categoryId: 1,
                createDate: new Date('2018-01-03'),
                latitude: 43,
                longitude: -72,
                imageXs: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs/DSC_1124.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs/DSC_1124.jpg'
                },
                imageXsSq: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs_sq/DSC_1124.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs_sq/DSC_1124.jpg'
                },
                imageSm: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/sm/DSC_1124.jpg',
                    downloadUrl: '/assets/images/2018/test1/sm/DSC_1124.jpg'
                },
                imageMd: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/md/DSC_1124.jpg',
                    downloadUrl: '/assets/images/2018/test1/md/DSC_1124.jpg'
                },
                imageLg: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/lg/DSC_1124.jpg',
                    downloadUrl: '/assets/images/2018/test1/lg/DSC_1124.jpg'
                },
                imagePrt: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1124.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1124.jpg'
                },
                imageSrc: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1124.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1124.jpg'
                },
                self: '/photos/3',
                categoryLink: '/photo-categories/1',
                commentsLink: '/photos/3/comments',
                exifLink: '/photos/3/exif',
                ratingLink: '/photos/3/rating'
            },
            {
                id: 4,
                categoryId: 1,
                createDate: new Date('2018-01-04'),
                latitude: null,
                longitude: null,
                imageXs: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs/DSC_1125.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs/DSC_1125.jpg'
                },
                imageXsSq: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs_sq/DSC_1125.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs_sq/DSC_1125.jpg'
                },
                imageSm: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/sm/DSC_1125.jpg',
                    downloadUrl: '/assets/images/2018/test1/sm/DSC_1125.jpg'
                },
                imageMd: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/md/DSC_1125.jpg',
                    downloadUrl: '/assets/images/2018/test1/md/DSC_1125.jpg'
                },
                imageLg: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/lg/DSC_1125.jpg',
                    downloadUrl: '/assets/images/2018/test1/lg/DSC_1125.jpg'
                },
                imagePrt: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1125.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1125.jpg'
                },
                imageSrc: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1125.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1125.jpg'
                },
                self: '/photos/4',
                categoryLink: '/photo-categories/1',
                commentsLink: '/photos/4/comments',
                exifLink: '/photos/4/exif',
                ratingLink: '/photos/4/rating'
            },
            {
                id: 5,
                categoryId: 1,
                createDate: new Date('2018-01-01'),
                latitude: null,
                longitude: null,
                imageXs: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs/DSC_1134.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs/DSC_1134.jpg'
                },
                imageXsSq: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/xs_sq/DSC_1134.jpg',
                    downloadUrl: '/assets/images/2018/test1/xs_sq/DSC_1134.jpg'
                },
                imageSm: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/sm/DSC_1134.jpg',
                    downloadUrl: '/assets/images/2018/test1/sm/DSC_1134.jpg'
                },
                imageMd: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/md/DSC_1134.jpg',
                    downloadUrl: '/assets/images/2018/test1/md/DSC_1134.jpg'
                },
                imageLg: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/lg/DSC_1134.jpg',
                    downloadUrl: '/assets/images/2018/test1/lg/DSC_1134.jpg'
                },
                imagePrt: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1134.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1134.jpg'
                },
                imageSrc: {
                    height: 400,
                    width: 400,
                    size: 1000,
                    url: '/assets/images/2018/test1/prt/DSC_1134.jpg',
                    downloadUrl: '/assets/images/2018/test1/prt/DSC_1134.jpg'
                },
                self: '/photos/5',
                categoryLink: '/photo-categories/1',
                commentsLink: '/photos/5/comments',
                exifLink: '/photos/5/exif',
                ratingLink: '/photos/5/rating'
            }
        ];
    }
}
