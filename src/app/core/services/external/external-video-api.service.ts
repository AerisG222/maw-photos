import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VideoCategory } from '../../models/video-category.model';
import { Video } from '../../models/video.model';
import { Comment } from '../../models/comment.model';
import { Rating } from '../../models/rating.model';
import { VideoApiService } from '../video-api.service';
import { EnvironmentConfig } from '../../models/environment-config.model';
import { ApiCollection } from '../../models/api-collection.model';
import { DateService } from '../date.service';

@Injectable()
export class ExternalVideoApiService implements VideoApiService {
    constructor(
        private _http: HttpClient,
        private _cfg: EnvironmentConfig,
        private _dateSvc: DateService
    ) { }

    getCategories(): Observable<ApiCollection<VideoCategory>> {
        const url = this.getAbsoluteUrl(`video-categories`);

        return this._http
            .get<ApiCollection<VideoCategory>>(url)
            .pipe(
                map(c => this.cleanupVideoCategories(c))
            );
    }

    getCategory(categoryId: number): Observable<VideoCategory> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}`);

        return this._http
            .get<VideoCategory>(url)
            .pipe(
                map(c => this.cleanupVideoCategory(c))
            );
    }

    getVideosByCategory(categoryId: number): Observable<ApiCollection<Video>> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}/videos`);

        return this._http
            .get<ApiCollection<Video>>(url)
            .pipe(
                map(v => this.cleanupVideos(v))
            );
    }

    getComments(videoId: number): Observable<ApiCollection<Comment>> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this._http
            .get<ApiCollection<Comment>>(url)
            .pipe(
                map(c => this.cleanupComments(c))
            );
    }

    getRating(videoId: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this._http
            .get<Rating>(url);
    }

    rateVideo(videoId: number, rating: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this._http
            .patch<Rating>(url, { videoId: videoId, rating: rating });
    }

    addComment(videoId: number, comment: string): Observable<any> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this._http
            .post(url, { videoId: videoId, comment: comment });
    }

    private getAbsoluteUrl(relativeUrl: string) {
        return `${this._cfg.apiUrl}/${relativeUrl}`;
    }

    private cleanupVideoCategories(categories: ApiCollection<VideoCategory>): ApiCollection<VideoCategory> {
        return {
            count: categories.count,
            items: categories.items.map(c => this.cleanupVideoCategory(c))
        };
    }

    private cleanupVideoCategory(category: VideoCategory): VideoCategory {
        category.createDate = this._dateSvc.safeParse(category.createDate);

        return category;
    }

    private cleanupVideos(videos: ApiCollection<Video>): ApiCollection<Video> {
        return {
            count: videos.count,
            items: videos.items.map(p => this.cleanupVideo(p))
        };
    }

    private cleanupVideo(video: Video): Video {
        video.createDate = this._dateSvc.safeParse(video.createDate);

        return video;
    }

    private cleanupComments(comments: ApiCollection<Comment>): ApiCollection<Comment> {
        return {
            count: comments.count,
            items: comments.items.map(c => this.cleanupComment(c))
        };
    }

    private cleanupComment(comment: Comment): Comment {
        comment.entryDate = this._dateSvc.safeParse(comment.entryDate);

        return comment;
    }
}
