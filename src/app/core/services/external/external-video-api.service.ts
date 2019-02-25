import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { VideoCategory } from '../../models/video-category.model';
import { Video } from '../../models/video.model';
import { Comment } from '../../models/comment.model';
import { Rating } from '../../models/rating.model';
import { VideoApiService } from '../video-api.service';
import { EnvironmentConfig } from '../../models/environment-config';

@Injectable()
export class ExternalVideoApiService implements VideoApiService {
    constructor(
        private _http: HttpClient,
        private _cfg: EnvironmentConfig
    ) { }

    getCategories(): Observable<VideoCategory[]> {
        throw new Error('Method not implemented.');
    }

    getCategory(categoryId: number): Observable<VideoCategory> {
        throw new Error('Method not implemented.');
    }

    getVideosByCategory(categoryId: number): Observable<Video[]> {
        throw new Error('Method not implemented.');
    }

    getComments(videoId: number): Observable<Comment[]> {
        throw new Error('Method not implemented.');
    }

    getRating(videoId: number): Observable<Rating> {
        throw new Error('Method not implemented.');
    }

    rateVideo(videoId: number, rating: number): Observable<number> {
        throw new Error('Method not implemented.');
    }

    addComment(videoId: number, comment: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
}
