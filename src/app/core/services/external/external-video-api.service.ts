import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        const url = this.getAbsoluteUrl(`video-categories`);

        return this._http
            .get<VideoCategory[]>(url);
    }

    getCategory(categoryId: number): Observable<VideoCategory> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}`);

        return this._http
            .get<VideoCategory>(url);
    }

    getVideosByCategory(categoryId: number): Observable<Video[]> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}/videos`);

        return this._http
            .get<Video[]>(url);
    }

    getComments(videoId: number): Observable<Comment[]> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this._http
            .get<Comment[]>(url)
            .pipe(
                map(comments => {
                    // deal with dates
                    return comments.map((x: Comment) => {
                        x.entryDate = new Date(x.entryDate.toString());
                        return x;
                    });
                })
            );
    }

    getRating(videoId: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this._http
            .get<Rating>(url);
    }

    rateVideo(videoId: number, rating: number): Observable<number> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this._http
            .patch<number>(url, { videoId: videoId, rating: rating });
    }

    addComment(videoId: number, comment: string): Observable<any> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this._http
            .post(url, { videoId: videoId, comment: comment });
    }

    private getAbsoluteUrl(relativeUrl: string) {
        return `${this._cfg.apiUrl}/${relativeUrl}`;
    }
}
