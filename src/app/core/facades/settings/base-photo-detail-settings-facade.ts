import { Observable } from 'rxjs';

import { nextThumbnailSize, PhotoDetailViewSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoDetailSettingsFacade extends BaseSettingsFacade<PhotoDetailViewSettings> {
    abstract settings$: Observable<PhotoDetailViewSettings>;

    toggleBreadcrumbs(): void {
        this.saveUpdatedField(x => x.showBreadcrumbs = !x.showBreadcrumbs);
    }

    togglePhotoList(): void {
        this.saveUpdatedField(x => x.showPhotoList = !x.showPhotoList);
    }

    toggleThumbnailSize(): void {
        this.saveUpdatedField(x => x.thumbnailSize = nextThumbnailSize(x.thumbnailSize));
    }

    abstract save(settings: PhotoDetailViewSettings): void;
}
