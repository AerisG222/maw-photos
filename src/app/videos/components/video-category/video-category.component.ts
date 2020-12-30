import { Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { VideoSize } from 'src/app/models/video-size.model';
import { Video } from 'src/app/models/video.model';
import { Settings } from 'src/app/models/settings.model';
import { VideoStoreSelectors } from 'src/app/videos/store';
import { SettingsStoreSelectors, VideoCategoryStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-videos-video-category',
    templateUrl: './video-category.component.html',
    styleUrls: ['./video-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCategoryComponent {
    @ViewChild('videoRef') videoRef: ElementRef | null = null;

    videoSize = VideoSize;
    settings$ = this.store.select(SettingsStoreSelectors.settings);
    category$ = this.store.select(VideoCategoryStoreSelectors.activeCategory);
    videos$ = this.store.select(VideoStoreSelectors.allVideos);
    activeVideo$ = this.store
        .select(VideoStoreSelectors.activeVideo)
        .pipe(
            tap(x => this.triggerVideoRefresh())
        );

    constructor(
        private store: Store
    ) { }

    getVideoDimensions(video: Video, settings: Settings | null): { width: string; height: string } {
        if (!!settings && settings.videoListVideoSize.name === VideoSize.large.name) {
            return { width: `${video.videoFull.width}px`, height: `${video.videoFull.height}px` };
        }

        return { width: `${video.videoScaled.width}px`, height: `${video.videoScaled.height}px` };
    }

    getVideoUrl(video: Video, settings: Settings | null): string {
        if (!!settings && settings.videoListVideoSize.name === VideoSize.large.name) {
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
