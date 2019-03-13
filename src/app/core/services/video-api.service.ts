import { Observable } from 'rxjs';

import { VideoCategory } from 'src/app/core/models/video-category.model';
import { Video } from 'src/app/core/models/video.model';
import { Comment } from 'src/app/core/models/comment.model';
import { Rating } from 'src/app/core/models/rating.model';
import { ApiCollection } from '../models/api-collection.model';

export const videoApiServiceToken = 'VideoApiService';

export interface VideoApiService {
    getCategories(): Observable<ApiCollection<VideoCategory>>;
    getCategory(categoryId: number): Observable<VideoCategory>;
    getVideosByCategory(categoryId: number): Observable<ApiCollection<Video>>;
    getComments(videoId: number): Observable<ApiCollection<Comment>>;
    getRating(videoId: number): Observable<Rating>;
    rateVideo(videoId: number, rating: number): Observable<number>;
    addComment(videoId: number, comment: string): Observable<any>;
}
