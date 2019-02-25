import { Observable } from 'rxjs';

import { VideoCategory } from 'src/app/core/models/video-category.model';
import { Video } from 'src/app/core/models/video.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
import { Rating } from 'src/app/core/models/rating.model';

export const videoApiServiceToken = 'VideoApiService';

export interface VideoApiService {
    getCategories(): Observable<VideoCategory[]>;
    getCategory(categoryId: number): Observable<VideoCategory>;
    getVideosByCategory(categoryId: number): Observable<Video[]>;
    getCommentsForVideo(videoId: number): Observable<PhotoComment[]>;
    getVideoRatingData(videoId: number): Observable<Rating>;
    rateVideo(videoId: number, rating: number): Observable<number>;
    addCommentForVideo(videoId: number, comment: string): Observable<any>;
}
