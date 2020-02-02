import { Injectable, Inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchApiService } from '../search-api.service';
import { SearchResult } from '../../models/search/search-result.model';
import { MultimediaCategory } from '../../models/search/multimedia-category.model';
import { photoApiServiceToken, PhotoApiService } from '../photo-api.service';
import { videoApiServiceToken, VideoApiService } from '../video-api.service';

@Injectable()
export class MockSearchApiService implements SearchApiService {
    constructor(
        @Inject(photoApiServiceToken) private photoApi: PhotoApiService,
        @Inject(videoApiServiceToken) private videoApi: VideoApiService
    ) {

    }

    search(query: string, start: number): Observable<SearchResult<MultimediaCategory>> {
        return this.getAll().pipe(
            map(c => ({
                totalFound: 40,
                startIndex: 0,
                results: c
            })));
    }


    private getAll() {
        const photoCategories = this.photoApi.getCategories().pipe(
            map(cats => {
                const list: MultimediaCategory[] = [];

                cats.items.forEach(c =>
                    list.push(({
                        solrId: `photo_${ c.id }`,
                        id: c.id,
                        year: c.year,
                        name: c.name,
                        multimediaType: 'photo',
                        teaserPhotoHeight: c.teaserImage.height,
                        teaserPhotoWidth: c.teaserImage.width,
                        teaserPhotoPath: c.teaserImage.url,
                        teaserPhotoSqHeight: c.teaserImageSq.height,
                        teaserPhotoSqWidth: c.teaserImageSq.width,
                        teaserPhotoSqPath: c.teaserImageSq.url
                    }))
                );

                return list;
            }));

        const videoCategories = this.videoApi.getCategories().pipe(
            map(cats => {
                const list: MultimediaCategory[] = [];

                cats.items.forEach(c =>
                    list.push(({
                        solrId: `video_${ c.id }`,
                        id: c.id,
                        year: c.year,
                        name: c.name,
                        multimediaType: 'video',
                        teaserPhotoHeight: c.teaserImage.height,
                        teaserPhotoWidth: c.teaserImage.width,
                        teaserPhotoPath: c.teaserImage.url,
                        teaserPhotoSqHeight: c.teaserImageSq.height,
                        teaserPhotoSqWidth: c.teaserImageSq.width,
                        teaserPhotoSqPath: c.teaserImageSq.url
                    }))
                );

                return list;
            }));

        return forkJoin([
                photoCategories,
                videoCategories
            ]).pipe(
                map(([photoCats, videoCats]) => [ ...photoCats, ...videoCats ])
            );
    }
}
