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
    _thumbnailSize: ThumbnailSize;
    imgWidth: number;
    imgHeight: number;

    @Input() photos: Photo[];
    @Input() selectedPhoto: Photo;
    @Output() photoSelected = new EventEmitter<Photo>();

    get thumbnailSize() {
        return this._thumbnailSize;
    }

    @Input()
    set thumbnailSize(size: ThumbnailSize) {
        this._thumbnailSize = size;

        switch(size) {
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
