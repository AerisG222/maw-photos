import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from 'src/app/core/models/video.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
    @Input() videos: Video[];
    @Input() selectedVideo: Video;
    @Input() thumbnailSize: ThumbnailSize;
    @Output() select = new EventEmitter<Video>();

    onClickVideo(video: Video): void {
        this.select.emit(video);
    }
}
