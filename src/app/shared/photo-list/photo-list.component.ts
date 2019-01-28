import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Photo } from '../../core/models/photo.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent {
    @Input() photos: Photo[];
    @Input() selectedPhoto: Photo;
    @Input() thumbnailSize: ThumbnailSize;
    @Output() select = new EventEmitter<Photo>();

    onClickPhoto(photo: Photo): void {
        this.select.emit(photo);
    }
}
