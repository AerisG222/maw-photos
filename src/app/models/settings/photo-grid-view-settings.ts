import { CategoryMargin } from '../category-margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface PhotoGridViewSettings {
    margin: CategoryMargin;
    showBreadcrumbs: boolean;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_PHOTO_GRID_VIEW_SETTINGS: PhotoGridViewSettings = {
    margin: CategoryMargin.dense,
    showBreadcrumbs: true,
    thumbnailSize: ThumbnailSize.default
};
