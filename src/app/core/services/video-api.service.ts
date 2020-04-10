import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { VideoCategory } from 'src/app/models/video-category.model';
import { Video } from 'src/app/models/video.model';
import { Comment } from 'src/app/models/comment.model';
import { Rating } from 'src/app/models/rating.model';
import { ApiCollection } from 'src/app/models/api-collection.model';
import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { GpsDetail } from 'src/app/models/gps-detail.model';

export const videoApiServiceToken = new InjectionToken<VideoApiService>('VideoApiService');

export interface VideoApiService {
    getCategories(): Observable<ApiCollection<VideoCategory>>;
    getCategory(categoryId: number): Observable<VideoCategory>;
    getVideosByCategory(categoryId: number): Observable<ApiCollection<Video>>;
    getComments(videoId: number): Observable<ApiCollection<Comment>>;
    getRating(videoId: number): Observable<Rating>;
    rateVideo(videoId: number, rating: number): Observable<Rating>;
    addComment(videoId: number, comment: string): Observable<any>;
    setTeaser(categoryId: number, videoId: number): Observable<VideoCategory>;
    getGpsDetail(videoId: number): Observable<GpsDetail>;
    setGpsCoordinateOverride(videoId: number, latLng: GpsCoordinate): Observable<GpsDetail>;
}
