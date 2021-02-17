import { Margin } from '../margin';
import { ThumbnailSize } from '../thumbnail-size';

export interface CategoryGridViewSettings {
    margin: Margin;
    showTitles: boolean;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_CATEGORY_GRID_VIEW_SETTINGS: CategoryGridViewSettings = {
    margin: Margin.dense,
    showTitles: true,
    thumbnailSize: ThumbnailSize.default,
};
