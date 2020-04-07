import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Video } from 'src/app/models/video.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent {
    videoThumbnailSize: ThumbnailSize;
    imgWidth: number;
    imgHeight: number;

    @Input() videos: Video[];
    @Input() selectedVideo: Video;
    @Output() videoSelected = new EventEmitter<Video>();

    get thumbnailSize() {
        return this.videoThumbnailSize;
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

    onClickVideo(video: Video): void {
        this.videoSelected.emit(video);
    }
}
