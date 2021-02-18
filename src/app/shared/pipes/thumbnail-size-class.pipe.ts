import { Pipe, PipeTransform } from '@angular/core';

import { ThumbnailSize, toThumbnailSizeDefaulted } from '@models';

@Pipe({
    name: 'thumbnailSizeClass',
})
export class ThumbnailSizeClassPipe implements PipeTransform {
    transform(
        value: ThumbnailSize | null,
        forceFullsize: boolean | null = false,
        ...args: unknown[]
    ): string {
        if (forceFullsize) {
            return '';
        }

        const size = toThumbnailSizeDefaulted(value);

        switch (size) {
            case ThumbnailSize.small:
                return 'thumb-small';
            case ThumbnailSize.verySmall:
                return 'thumb-very-small';
            case ThumbnailSize.tiny:
                return 'thumb-tiny';
            case ThumbnailSize.default:
            default:
                return '';
        }
    }
}
