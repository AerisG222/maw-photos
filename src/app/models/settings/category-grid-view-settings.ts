import { CategoryMargin } from '../category-margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface CategoryGridViewSettings {
    margin: CategoryMargin;
    showTitles: boolean;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_CATEGORY_GRID_VIEW_SETTINGS: CategoryGridViewSettings = {
    margin: CategoryMargin.dense,
    showTitles: true,
    thumbnailSize: ThumbnailSize.default,
};
