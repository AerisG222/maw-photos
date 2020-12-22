import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
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
    @ViewChild('videoRef') videoRef: ElementRef | null = null;

    videoSize = VideoSize;
    showCategoryAsLink = false;
    settings$: Observable<Settings> | null = null;
    category$: Observable<Category> | null = null;
    videos$: Observable<Video[]> | null = null;
    activeVideo$: Observable<Video> | null = null;

    private settings: Settings | null = null;

    constructor(
        private route: ActivatedRoute,
        private store: Store
    ) { }

    ngOnInit(): void {
        this.settings$ = this.store
            .select(SettingsStoreSelectors.selectSettings)
            .pipe(
                tap(settings => this.settings = settings)
            );

        this.category$ = this.store
            .select(VideoCategoryStoreSelectors.selectActiveCategory)
            .pipe(
                filter(x => !!x),
                map(x => x as Category)
            );

        this.videos$ = this.store
            .select(VideoStoreSelectors.selectAllVideos)
            .pipe(
                filter(x => !!x && x.length > 0),
                tap(videos => this.setActiveVideo(videos[0]))
            );

        this.activeVideo$ = this.store
            .select(VideoStoreSelectors.selectActiveVideo)
            .pipe(
                filter(x => !!x),
                map(x => x as Video),
                tap(x => this.triggerVideoRefresh())
            );

        this.store.dispatch(VideoStoreActions.clearRequest());

        this.route.params
            .pipe(
                first(),
                map(p => Number(p.id)),
                tap(id => this.store.dispatch(VideoCategoryStoreActions.setActiveCategoryId({ categoryId: id }))),
                tap(id => this.store.dispatch(VideoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe();
    }

    ngOnDestroy(): void {
        this.store.dispatch(VideoStoreActions.unsetActiveVideoId());
    }

    onSelectVideo(video: Video): void {
        this.setActiveVideo(video);
    }

    getVideoDimensions(video: Video): { width: string; height: string } {
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

    private triggerVideoRefresh(): void {
        setTimeout(() => {
            if (!!this.videoRef) {
                this.videoRef.nativeElement.load();
                this.videoRef.nativeElement.play();
            }
        }, 0, false);
    }

    private setActiveVideo(video: Video): void {
        this.store.dispatch(VideoStoreActions.setActiveVideoId({ id: video.id }));
    }
}
