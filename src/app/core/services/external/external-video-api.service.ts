import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { VideoCategory } from 'src/app/models/video-category.model';
import { Video } from 'src/app/models/video.model';
import { Comment } from 'src/app/models/comment.model';
import { Rating } from 'src/app/models/rating.model';
import { VideoApiService } from 'src/app/core/services/video-api.service';
import { ApiCollection } from 'src/app/models/api-collection.model';
import { DateService } from 'src/app/core/services/date.service';
import { environment } from 'src/environments/environment';
import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { GpsDetail } from 'src/app/models/gps-detail.model';

// TODO: remove first()  [https://github.com/angular/angular/issues/20755]

@Injectable()
export class ExternalVideoApiService implements VideoApiService {
    constructor(
        private http: HttpClient,
        private dateSvc: DateService
    ) { }

    getCategories(): Observable<ApiCollection<VideoCategory>> {
        const url = this.getAbsoluteUrl(`video-categories`);

        return this.http
            .get<ApiCollection<VideoCategory>>(url)
            .pipe(
                map(c => this.cleanupVideoCategories(c))
            );
    }

    getCategory(categoryId: number): Observable<VideoCategory> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}`);

        return this.http
            .get<VideoCategory>(url)
            .pipe(
                map(c => this.cleanupVideoCategory(c))
            );
    }

    getVideosByCategory(categoryId: number): Observable<ApiCollection<Video>> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}/videos`);

        return this.http
            .get<ApiCollection<Video>>(url)
            .pipe(
                map(v => this.cleanupVideos(v))
            );
    }

    getComments(videoId: number): Observable<ApiCollection<Comment>> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this.http
            .get<ApiCollection<Comment>>(url)
            .pipe(
                map(c => this.cleanupComments(c))
            );
    }

    getRating(videoId: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this.http
            .get<Rating>(url);
    }

    rateVideo(videoId: number, rating: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this.http
            .patch<Rating>(url, { videoId, rating });
    }

    addComment(videoId: number, comment: string): Observable<any> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this.http
            .post(url, { videoId, comment })
            .pipe(
                first()
            );
    }

    getGpsDetail(videoId: number): Observable<GpsDetail> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/gps`);

        return this.http
            .get<GpsDetail>(url);
    }

    setGpsCoordinateOverride(videoId: number, gps: GpsCoordinate): Observable<GpsDetail> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/gps`);

        return this.http
            .patch<GpsDetail>(url, gps)
            .pipe(
                first()
            );
    }

    setTeaser(categoryId: number, videoId: number): Observable<VideoCategory> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}/teaser`);

        return this.http
            .patch<VideoCategory>(url, { videoId })
            .pipe(
                first(),
                map(v => this.cleanupVideoCategory(v))
            );
    }

    private getAbsoluteUrl(relativeUrl: string): string {
        return `${environment.apiUrl}/${relativeUrl}`;
    }

    private cleanupVideoCategories(categories: ApiCollection<VideoCategory>): ApiCollection<VideoCategory> {
        return {
            count: categories.count,
            items: categories.items.map(c => this.cleanupVideoCategory(c))
        };
    }

    private cleanupVideoCategory(category: VideoCategory): VideoCategory {
        category.createDate = this.dateSvc.safeParse(category.createDate);

        return category;
    }

    private cleanupVideos(videos: ApiCollection<Video>): ApiCollection<Video> {
        return {
            count: videos.count,
            items: videos.items.map(p => this.cleanupVideo(p))
        };
    }

    private cleanupVideo(video: Video): Video {
        video.createDate = this.dateSvc.safeParse(video.createDate);

        return video;
    }

    private cleanupComments(comments: ApiCollection<Comment>): ApiCollection<Comment> {
        return {
            count: comments.count,
            items: comments.items.map(c => this.cleanupComment(c))
        };
    }

    private cleanupComment(comment: Comment): Comment {
        comment.entryDate = this.dateSvc.safeParse(comment.entryDate);

        return comment;
    }
}
