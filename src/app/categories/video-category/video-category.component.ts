import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { toolbarShow } from 'src/app/shared/animations';
import { VideoSize } from 'src/app/core/models/video-size.model';
import { Video } from 'src/app/core/models/video.model';
import { Settings } from 'src/app/core/models/settings.model';
import { Category } from 'src/app/core/models/category.model';
import {
    SettingsStoreActions,
    SettingsStoreSelectors,
    VideoCategoryStoreActions,
    VideoCategoryStoreSelectors,
    VideoStoreActions,
    VideoStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-video-category',
    templateUrl: './video-category.component.html',
    styleUrls: ['./video-category.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ]
})
export class VideoCategoryComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

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
        this.store$.dispatch(SettingsStoreActions.loadRequest());

        this.destroySub.add(this.route.params
            .pipe(
                map(p => Number(p.id)),
                tap(id => this.store$.dispatch(VideoCategoryStoreActions.setCurrentById({ categoryId: id }))),
                tap(id => this.store$.dispatch(VideoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
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
