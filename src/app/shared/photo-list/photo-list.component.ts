import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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
    @Output() photoSelected = new EventEmitter<Photo>();

    onClickPhoto(photo: Photo): void {
        this.photoSelected.emit(photo);
    }

    scrollIntoView(photoId: number, elementRef: HTMLElement) {
        if (!!this.selectedPhoto && this.selectedPhoto.id === photoId) {
            const parent = elementRef.parentElement;
            const parentMiddle = parent.clientWidth / 2;
            const imgWidth = elementRef.clientWidth / 2;
            const newLeft = Math.max(0, elementRef.offsetLeft + imgWidth - parentMiddle);

            parent.scrollTo({ top: 0, left: newLeft, behavior: 'smooth' });
        }

        return '';
    }
}
