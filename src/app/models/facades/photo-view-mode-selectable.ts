import { Observable } from 'rxjs';

import { PhotoViewMode } from '@models';

export abstract class PhotoViewModeSelectable {
    abstract activePhotoViewMode$: Observable<PhotoViewMode>;
    abstract preferredPhotoViewMode$: Observable<PhotoViewMode>;

    abstract selectPhotoViewMode(viewMode: PhotoViewMode): void;
}
