import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Video } from 'src/app/core/models/video.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent {
    @Input() videos: Video[];
    @Input() selectedVideo: Video;
    @Input() thumbnailSize: ThumbnailSize;
    @Output() videoSelected = new EventEmitter<Video>();

    onClickVideo(video: Video): void {
        this.videoSelected.emit(video);
    }
}
