import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { Photo } from 'src/app/core/models/photo.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListComponent {
    @Input() photos: Photo[];
    @Input() selectedPhoto: Photo;
    @Input() thumbnailSize: ThumbnailSize;
    @Output() select = new EventEmitter<Photo>();

    onClickPhoto(photo: Photo): void {
        this.select.emit(photo);
    }

    scrollIntoView(photoId: number, elementRef: HTMLElement) {
        if (!!this.selectedPhoto && this.selectedPhoto.id === photoId) {
            elementRef.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }

        return '';
    }
}
