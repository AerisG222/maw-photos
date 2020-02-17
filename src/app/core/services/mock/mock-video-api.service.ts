import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { VideoCategory } from '../../models/video-category.model';
import { Video } from '../../models/video.model';
import { Comment } from '../../models/comment.model';
import { Rating } from '../../models/rating.model';
import { VideoApiService } from '../video-api.service';
import { ApiCollection } from '../../models/api-collection.model';
import { DateService } from '../date.service';
import { GpsCoordinate } from '../../models/gps-coordinate.model';

@Injectable()
export class MockVideoApiService implements VideoApiService {
    private categories: VideoCategory[];
    private videos: Video[];

    constructor(
        private dateSvc: DateService
    ) {
        this.initData();
     }

    getCategories(): Observable<ApiCollection<VideoCategory>> {
        return of({
            count: this.categories.length,
            items: this.categories
        });
    }

    getCategory(categoryId: number): Observable<VideoCategory> {
        return of(this.categories.filter(x => x.id === categoryId)[0]);
    }

    getVideosByCategory(categoryId: number): Observable<ApiCollection<Video>> {
        const videos = this.videos
            .filter(x => x.categoryId === categoryId);

        return of({
            count: videos.length,
            items: videos
        });
    }

    getComments(videoId: number): Observable<ApiCollection<Comment>> {
        return of(​{
            count: 2,
            items: [
                { entryDate: new Date('2012-11-15T14:50:45'), commentText: 'another test', username: 'mmorano' },
                { entryDate: new Date('2012-10-15T14:50:45'), commentText: 'a test', username: 'mmorano' }
            ]
        });
    }

    getRating(videoId: number): Observable<Rating> {
        return of({ userRating: 2, averageRating: 4 });
    }

    rateVideo(videoId: number, rating: number): Observable<Rating> {
        return of({ userRating: 3, averageRating: 4.5 });
    }

    addComment(videoId: number, comment: string): Observable<any> {
        return of(true);
    }

    getSourceGpsCoordinate(videoId: number): Observable<GpsCoordinate> {
        return of({ lat: 43.11111, lng: -72.22222 });
    }

    getGpsCoordinateOverride(videoId: number): Observable<GpsCoordinate> {
        return of({ lat: 43.12345, lng: -72.67890 });
    }

    setGpsCoordinateOverride(videoId: number, latLng: GpsCoordinate) {
        return of(true);
    }

    private initData(): void {
        this.categories = [
            {
                id: 1,
                name: 'Test 1',
                year: 2018,
                createDate: new Date('2018-01-01'),
                latitude: null,
                longitude: null,
                videoCount: 150,
                totalDuration: 1234,
                totalSizeThumbnail: 10000,
                totalSizeThumbnailSq: 20000,
                totalSizeScaled: 30000,
                totalSizeFull: 40000,
                totalSizeRaw: 50000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/xs/DSC_1122.jpg',
                    size: 2000
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/xs/DSC_1122.jpg',
                    size: 2000
                },
                self: '/video-categories/1',
                videosLink: '/video-categories/1/videos'
            },
            {
                id: 1,
                name: 'Test 2',
                year: 2018,
                createDate: new Date('2018-02-01'),
                latitude: null,
                longitude: null,
                videoCount: 150,
                totalDuration: 1234,
                totalSizeThumbnail: 10000,
                totalSizeThumbnailSq: 20000,
                totalSizeScaled: 30000,
                totalSizeFull: 40000,
                totalSizeRaw: 50000,
                totalSize: 280000,
                teaserImage: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test2/xs/DSC_1122.jpg',
                    size: 2000
                },
                teaserImageSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test2/xs/DSC_1122.jpg',
                    size: 2000
                },
                self: '/video-categories/2',
                videosLink: '/video-categories/2/videos'
            }
        ];

        this.videos = [
            {
                id: 1,
                categoryId: 1,
                createDate: new Date('2018-01-01'),
                latitude: 34.060385,
                longitude: -118.297796,
                duration: 123,
                thumbnail: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/xs/DSC_1122.jpg',
                    size: 1000
                },
                thumbnailSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/xs_sq/DSC_1122.jpg',
                    size: 1000
                },
                videoScaled: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/sm/DSC_1122.jpg',
                    size: 1000
                },
                videoFull: {
                    height: 600,
                    width: 600,
                    url: '/assets/movies/2018/test1/md/DSC_1122.jpg',
                    size: 1000
                },
                videoRaw: {
                    height: 600,
                    width: 600,
                    url: '/assets/movies/2018/test1/lg/DSC_1122.jpg',
                    size: 1000
                },
                self: '/videos/1',
                categoryLink: '/video-categories/1',
                commentsLink: '/videos/1/comments',
                ratingLink: '/videos/1/rating'
            },
            {
                id: 2,
                categoryId: 1,
                createDate: new Date('2018-01-02'),
                latitude: 42.363393,
                longitude: -71.057865,
                duration: 123,
                thumbnail: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/xs/DSC_1123.jpg',
                    size: 1000
                },
                thumbnailSq: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/xs_sq/DSC_1123.jpg',
                    size: 1000
                },
                videoScaled: {
                    height: 400,
                    width: 400,
                    url: '/assets/movies/2018/test1/sm/DSC_1123.jpg',
                    size: 1000
                },
                videoFull: {
                    height: 600,
                    width: 600,
                    url: '/assets/movies/2018/test1/md/DSC_1123.jpg',
                    size: 1000
                },
                videoRaw: {
                    height: 600,
                    width: 600,
                    url: '/assets/movies/2018/test1/lg/DSC_1123.jpg',
                    size: 1000
                },
                self: '/videos/2',
                categoryLink: '/video-categories/1',
                commentsLink: '/videos/2/comments',
                ratingLink: '/videos/2/rating'
            }
        ];
    }
}
