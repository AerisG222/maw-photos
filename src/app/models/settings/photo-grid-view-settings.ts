import { Margin } from '../margin';
import { ThumbnailSize } from '../thumbnail-size';

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
