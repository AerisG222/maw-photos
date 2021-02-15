import { Margin } from '../margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

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
