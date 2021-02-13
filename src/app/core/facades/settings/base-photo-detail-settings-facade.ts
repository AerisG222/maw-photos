import { Observable } from 'rxjs';

import { PhotoDetailViewSettings, ThumbnailSize } from '@models';
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
        this.saveUpdatedField(x => {
            const newSize = ThumbnailSize.nextSize(x.thumbnailSize.name);
            x.thumbnailSize = newSize;
        });
    }

    abstract save(settings: PhotoDetailViewSettings): void;
}
