import { Injectable, Inject } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchApiService } from '../search-api.service';
import { MultimediaCategory, SearchResult } from '../../models';
import {
    photoApiServiceToken,
    PhotoApiService,
    videoApiServiceToken,
    VideoApiService,
} from '@core/services';

@Injectable()
export class MockSearchApiService implements SearchApiService {
    private returnNoResults = false;

    constructor(
        @Inject(photoApiServiceToken) private photoApi: PhotoApiService,
        @Inject(videoApiServiceToken) private videoApi: VideoApiService
    ) {}

    search(): Observable<SearchResult<MultimediaCategory>> {
        let result = null;

        if (this.returnNoResults) {
            result = of({
                totalFound: 0,
                startIndex: 0,
                results: [],
            });
        } else {
            result = this.getAll().pipe(
                map((c) => ({
                    totalFound: 40,
                    startIndex: 0,
                    results: c,
                }))
            );
        }

        this.returnNoResults = !this.returnNoResults;

        return result;
    }

    private getAll(): Observable<MultimediaCategory[]> {
        const photoCategories = this.photoApi.getCategories().pipe(
            map((cats) => {
                const list: MultimediaCategory[] = [];

                cats.items.forEach((c) =>
                    list.push({
                        solrId: `photo_${c.id}`,
                        id: c.id,
                        year: c.year,
                        name: c.name,
                        multimediaType: 'photo',
                        teaserPhotoHeight: c.teaserImage.height,
                        teaserPhotoWidth: c.teaserImage.width,
                        teaserPhotoPath: c.teaserImage.url,
                        teaserPhotoSqHeight: c.teaserImageSq.height,
                        teaserPhotoSqWidth: c.teaserImageSq.width,
                        teaserPhotoSqPath: c.teaserImageSq.url,
                        score: 1,
                    })
                );

                return list;
            })
        );

        const videoCategories = this.videoApi.getCategories().pipe(
            map((cats) => {
                const list: MultimediaCategory[] = [];

                cats.items.forEach((c) =>
                    list.push({
                        solrId: `video_${c.id}`,
                        id: c.id,
                        year: c.year,
                        name: c.name,
                        multimediaType: 'video',
                        teaserPhotoHeight: c.teaserImage.height,
                        teaserPhotoWidth: c.teaserImage.width,
                        teaserPhotoPath: c.teaserImage.url,
                        teaserPhotoSqHeight: c.teaserImageSq.height,
                        teaserPhotoSqWidth: c.teaserImageSq.width,
                        teaserPhotoSqPath: c.teaserImageSq.url,
                        score: 1,
                    })
                );

                return list;
            })
        );

        return forkJoin([photoCategories, videoCategories]).pipe(
            map(([photoCats, videoCats]) => [...photoCats, ...videoCats])
        );
    }
}
