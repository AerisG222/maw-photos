import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { DEFAULT_SETTINGS, ThumbnailSize, Video } from '@models';

@Component({
    selector: 'app-videos-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent {
    @Input() videos: Video[] | null = null;
    @Input() selectedVideo: Video | null = null;

    videoThumbnailSize: ThumbnailSize | null = null;
    imgWidth: number | null = null;
    imgHeight: number | null = null;

    get thumbnailSize(): ThumbnailSize {
        return this.videoThumbnailSize ?? DEFAULT_SETTINGS.videoListThumbnailSize;
    }

    @Input()
    set thumbnailSize(size: ThumbnailSize) {
        this.videoThumbnailSize = size;

        switch (size) {
            case ThumbnailSize.verySmall:
                this.imgWidth = 80;
                this.imgHeight = 60;
                break;
            case ThumbnailSize.small:
                this.imgWidth = 120;
                this.imgHeight = 90;
                break;
            case ThumbnailSize.tiny:
                this.imgWidth = 40;
                this.imgHeight = 30;
                break;
            case ThumbnailSize.default:
                this.imgWidth = 160;
                this.imgHeight = 120;
                break;
            default:
                this.imgWidth = 160;
                this.imgHeight = 120;
                break;
        }
    }
}
