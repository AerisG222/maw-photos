import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, filter, first } from 'rxjs/operators';

import { VideoSize } from 'src/app/models/video-size.model';
import { Video } from 'src/app/models/video.model';
import { Settings } from 'src/app/models/settings.model';
import { Category } from 'src/app/models/category.model';
import { VideoStoreActions, VideoStoreSelectors } from 'src/app/videos/store';
import { SettingsStoreSelectors, VideoCategoryStoreActions, VideoCategoryStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-videos-video-category',
    templateUrl: './video-category.component.html',
    styleUrls: ['./video-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCategoryComponent implements OnInit, OnDestroy {
    videoSize = VideoSize;
    showCategoryAsLink = false;
    settings$: Observable<Settings>;
    category$: Observable<Category>;
    videos$: Observable<Video[]>;
    activeVideo$: Observable<Video>;

    @ViewChild('videoRef') videoRef: ElementRef;

    private settings: Settings;

    constructor(
        private route: ActivatedRoute,
        private store$: Store
    ) { }

    ngOnInit() {
        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            );

        this.category$ = this.store$
            .pipe(
                select(VideoCategoryStoreSelectors.selectCurrentCategoryAsCategory),
            );

        this.videos$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectAllVideos),
                tap(videos => this.setCurrentVideo(videos[0]))
            );

        this.activeVideo$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(x => !!x),
                tap(x => this.triggerVideoRefresh())
            );

        this.store$.dispatch(VideoStoreActions.clearRequest());

        this.route.params
            .pipe(
                first(),
                map(p => Number(p.id)),
                tap(id => this.store$.dispatch(VideoCategoryStoreActions.setCurrentById({ categoryId: id }))),
                tap(id => this.store$.dispatch(VideoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe();
    }

    ngOnDestroy(): void {
        this.setCurrentVideo(null);
    }

    onSelectVideo(video: Video): void {
        this.setCurrentVideo(video);
    }

    getVideoDimensions(video: Video): { width: string, height: string } {
        if (!!this.settings && this.settings.videoListVideoSize.name === VideoSize.large.name) {
            return { width: `${video.videoFull.width}px`, height: `${video.videoFull.height}px` };
        }

        return { width: `${video.videoScaled.width}px`, height: `${video.videoScaled.height}px` };
    }

    getVideoUrl(video: Video): string {
        if (!!this.settings && this.settings.videoListVideoSize.name === VideoSize.large.name) {
            return video.videoFull.url;
        }

        return video.videoScaled.url;
    }

    private triggerVideoRefresh() {
        setTimeout(() => {
            if (!!this.videoRef) {
                this.videoRef.nativeElement.load();
                this.videoRef.nativeElement.play();
            }
        }, 0, false);
    }

    private setCurrentVideo(video: Video): void {
        this.store$.dispatch(VideoStoreActions.setCurrent({ video }));
    }
}
