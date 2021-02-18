import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import {
    Photo,
    ThumbnailSize,
    DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS,
} from '@models';
import { PhotoLinkable } from '@core/facades';

@Component({
    selector: 'app-photos-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent {
    @Input() photos: Photo[] | null = null;
    @Input() selectedPhoto: Photo | null = null;

    photoThumbnailSize: ThumbnailSize | null = null;
    imgWidth: number | null = null;
    imgHeight: number | null = null;

    get thumbnailSize(): ThumbnailSize {
        return (
            this.photoThumbnailSize ??
            DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS.thumbnailSize
        );
    }

    @Input()
    set thumbnailSize(size: ThumbnailSize) {
        this.photoThumbnailSize = size;

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

    constructor(public photoLinkable: PhotoLinkable) {}

    scrollIntoView(photoId: number, elementRef: HTMLElement): string {
        if (!!this.selectedPhoto && this.selectedPhoto.id === photoId) {
            const parent = elementRef.parentElement;

            if (parent) {
                const parentMiddle = parent.clientWidth / 2;
                const imgWidth = elementRef.clientWidth / 2;
                const newLeft = Math.max(
                    0,
                    elementRef.offsetLeft + imgWidth - parentMiddle
                );

                parent.scrollTo({ top: 0, left: newLeft, behavior: 'smooth' });
            }
        }

        return '';
    }

    trackByPhoto(index: number, photo: Photo): string {
        return photo.id.toString();
    }
}
