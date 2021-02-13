import { Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Video, VideoDetailViewSettings, VideoSize } from '@models';
import { VideoStoreSelectors } from 'src/app/videos/store';
import { VideoCategoryStoreSelectors } from '@core/root-store';
import { VideoDetailSettingsFacade } from '@core/facades/settings/video-detail-settings-facade';

@Component({
    selector: 'app-videos-video-category',
    templateUrl: './video-category.component.html',
    styleUrls: ['./video-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCategoryComponent {
    @ViewChild('videoRef') videoRef: ElementRef | null = null;

    videoSize = VideoSize;
    settings$ = this.videoFacade.settings$;
    category$ = this.store.select(VideoCategoryStoreSelectors.activeCategory);
    videos$ = this.store.select(VideoStoreSelectors.allVideos);
    activeVideo$ = this.store
        .select(VideoStoreSelectors.activeVideo)
        .pipe(
            tap(x => this.triggerVideoRefresh())
        );

    constructor(
        private store: Store,
        private videoFacade: VideoDetailSettingsFacade
    ) { }

    getVideoDimensions(video: Video, settings: VideoDetailViewSettings | null): { width: string; height: string } {
        if (!!settings && settings.videoSize.name === VideoSize.large.name) {
            return { width: `${video.videoFull.width}px`, height: `${video.videoFull.height}px` };
        }

        return { width: `${video.videoScaled.width}px`, height: `${video.videoScaled.height}px` };
    }

    getVideoUrl(video: Video, settings: VideoDetailViewSettings | null): string {
        if (!!settings && settings.videoSize.name === VideoSize.large.name) {
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
}
