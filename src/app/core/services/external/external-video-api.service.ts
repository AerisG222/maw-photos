import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    VideoCategory,
    Video,
    Comment,
    Rating,
    ApiCollection,
    GpsCoordinate,
    GpsDetail,
} from '@models';
import { DateService, VideoApiService } from '@core/services';
import { environment } from 'src/environments/environment';

@Injectable()
export class ExternalVideoApiService implements VideoApiService {
    constructor(private http: HttpClient, private dateSvc: DateService) {}

    getCategories(): Observable<ApiCollection<VideoCategory>> {
        const url = this.getAbsoluteUrl(`video-categories`);

        return this.http
            .get<ApiCollection<VideoCategory>>(url)
            .pipe(map((c) => this.cleanupVideoCategories(c)));
    }

    getCategory(categoryId: number): Observable<VideoCategory> {
        const url = this.getAbsoluteUrl(`video-categories/${categoryId}`);

        return this.http
            .get<VideoCategory>(url)
            .pipe(map((c) => this.cleanupVideoCategory(c)));
    }

    getVideosByCategory(categoryId: number): Observable<ApiCollection<Video>> {
        const url = this.getAbsoluteUrl(
            `video-categories/${categoryId}/videos`
        );

        return this.http
            .get<ApiCollection<Video>>(url)
            .pipe(map((v) => this.cleanupVideos(v)));
    }

    getComments(videoId: number): Observable<ApiCollection<Comment>> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this.http
            .get<ApiCollection<Comment>>(url)
            .pipe(map((c) => this.cleanupComments(c)));
    }

    getRating(videoId: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this.http.get<Rating>(url);
    }

    rateVideo(videoId: number, rating: number): Observable<Rating> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/rating`);

        return this.http.patch<Rating>(url, { videoId, rating });
    }

    addComment(
        videoId: number,
        comment: string
    ): Observable<ApiCollection<Comment>> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/comments`);

        return this.http.post<ApiCollection<Comment>>(url, {
            videoId,
            comment,
        });
    }

    getGpsDetail(videoId: number): Observable<GpsDetail> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/gps`);

        return this.http.get<GpsDetail>(url);
    }

    setGpsCoordinateOverride(
        videoId: number,
        gps: GpsCoordinate
    ): Observable<GpsDetail> {
        const url = this.getAbsoluteUrl(`videos/${videoId}/gps`);

        return this.http.patch<GpsDetail>(url, gps);
    }

    setTeaser(categoryId: number, videoId: number): Observable<VideoCategory> {
        const url = this.getAbsoluteUrl(
            `video-categories/${categoryId}/teaser`
        );

        return this.http
            .patch<VideoCategory>(url, { videoId })
            .pipe(map((v) => this.cleanupVideoCategory(v)));
    }

    private getAbsoluteUrl(relativeUrl: string): string {
        return `${environment.apiUrl}/${relativeUrl}`;
    }

    private cleanupVideoCategories(
        categories: ApiCollection<VideoCategory>
    ): ApiCollection<VideoCategory> {
        return {
            count: categories.count,
            items: categories.items.map((c) => this.cleanupVideoCategory(c)),
        };
    }

    private cleanupVideoCategory(category: VideoCategory): VideoCategory {
        category.createDate = this.dateSvc.safeParse(category.createDate);

        return category;
    }

    private cleanupVideos(videos: ApiCollection<Video>): ApiCollection<Video> {
        return {
            count: videos.count,
            items: videos.items.map((p) => this.cleanupVideo(p)),
        };
    }

    private cleanupVideo(video: Video): Video {
        video.createDate = this.dateSvc.safeParse(video.createDate);

        return video;
    }

    private cleanupComments(
        comments: ApiCollection<Comment>
    ): ApiCollection<Comment> {
        return {
            count: comments.count,
            items: comments.items.map((c) => this.cleanupComment(c)),
        };
    }

    private cleanupComment(comment: Comment): Comment {
        comment.entryDate = this.dateSvc.safeParse(comment.entryDate);

        return comment;
    }
}
