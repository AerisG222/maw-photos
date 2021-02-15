import { Observable } from 'rxjs';

import { nextMargin, PhotoGridViewSettings, ThumbnailSize } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoGridSettingsFacade extends BaseSettingsFacade<PhotoGridViewSettings> {
    abstract settings$: Observable<PhotoGridViewSettings>;

    toggleBreadcrumbs(): void {
        this.saveUpdatedField(x => x.showBreadcrumbs = !x.showBreadcrumbs);
    }

    toggleMargin(): void {
        this.saveUpdatedField(x => {
            const newSize = nextMargin(x.margin);
            x.margin = newSize;
        });
    }

    toggleThumbnailSize(): void {
        this.saveUpdatedField(x => {
            const newSize = ThumbnailSize.nextSize(x.thumbnailSize.name);
            x.thumbnailSize = newSize;
        });
    }

    abstract save(settings: PhotoGridViewSettings): void;
}
