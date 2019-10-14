import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { VideoCategory } from 'src/app/core/models/video-category.model';
import { Video } from 'src/app/core/models/video.model';
import { Settings } from 'src/app/core/models/settings.model';
import {
    LayoutStoreActions,
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors,
    VideoCategoryStoreActions,
    VideoCategoryStoreSelectors,
    VideoStoreActions,
    VideoStoreSelectors
} from 'src/app/core/root-store';
import { VideoSize } from 'src/app/core/models/video-size.model';

@Component({
    selector: 'app-video-category',
    templateUrl: './video-category.component.html',
    styleUrls: ['./video-category.component.scss']
})
export class VideoCategoryComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    videoSize = VideoSize;
    showCategoryAsLink = false;
    settings$: Observable<Settings>;
    category$: Observable<VideoCategory>;
    videos$: Observable<Video[]>;
    activeVideo$: Observable<Video>;

    @ViewChild('videoRef', {static: false}) videoRef: ElementRef;

    private settings: Settings;

    constructor(
        private route: ActivatedRoute,
        private store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            );

        this.category$ = this.store$
            .pipe(
                select(VideoCategoryStoreSelectors.selectCurrentCategory),
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
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());

        this.destroySub.add(this.route.params
            .pipe(
                map(p => Number(p.id)),
                tap(id => this.store$.dispatch(VideoCategoryStoreActions.setCurrentById({ categoryId: id }))),
                tap(id => this.store$.dispatch(VideoStoreActions.loadRequest({ categoryId: id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.closeRightSidebarRequest());
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
