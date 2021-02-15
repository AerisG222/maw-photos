import { Observable } from 'rxjs';

import { nextMargin, nextThumbnailSize, PhotoGridViewSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoGridSettingsFacade extends BaseSettingsFacade<PhotoGridViewSettings> {
    abstract settings$: Observable<PhotoGridViewSettings>;

    toggleBreadcrumbs(): void {
        this.saveUpdatedField(x => x.showBreadcrumbs = !x.showBreadcrumbs);
    }

    toggleMargin(): void {
        this.saveUpdatedField(x => x.margin = nextMargin(x.margin));
    }

    toggleThumbnailSize(): void {
        this.saveUpdatedField(x => x.thumbnailSize = nextThumbnailSize(x.thumbnailSize));
    }

    abstract save(settings: PhotoGridViewSettings): void;
}
