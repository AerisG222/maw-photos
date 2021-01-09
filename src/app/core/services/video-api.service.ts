import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { VideoCategory } from '@models/video-category.model';
import { Video } from '@models/video.model';
import { Comment } from '@models/comment.model';
import { Rating } from '@models/rating.model';
import { ApiCollection } from '@models/api-collection.model';
import { GpsCoordinate } from '@models/gps-coordinate.model';
import { GpsDetail } from '@models/gps-detail.model';

export const videoApiServiceToken = new InjectionToken<VideoApiService>('VideoApiService');

export interface VideoApiService {
    getCategories(): Observable<ApiCollection<VideoCategory>>;
    getCategory(categoryId: number): Observable<VideoCategory>;
    getVideosByCategory(categoryId: number): Observable<ApiCollection<Video>>;
    getComments(videoId: number): Observable<ApiCollection<Comment>>;
    getRating(videoId: number): Observable<Rating>;
    rateVideo(videoId: number, rating: number): Observable<Rating>;
    addComment(videoId: number, comment: string): Observable<ApiCollection<Comment>>;
    setTeaser(categoryId: number, videoId: number): Observable<VideoCategory>;
    getGpsDetail(videoId: number): Observable<GpsDetail>;
    setGpsCoordinateOverride(videoId: number, latLng: GpsCoordinate): Observable<GpsDetail>;
}
