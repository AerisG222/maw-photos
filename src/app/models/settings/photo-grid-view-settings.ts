import { Margin } from '../margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface PhotoGridViewSettings {
    margin: Margin;
    showBreadcrumbs: boolean;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_PHOTO_GRID_VIEW_SETTINGS: PhotoGridViewSettings = {
    margin: Margin.dense,
    showBreadcrumbs: true,
    thumbnailSize: ThumbnailSize.default
};
