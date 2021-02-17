import { Margin } from '../margin';
import { ThumbnailSize } from '../thumbnail-size';

export interface CategoryListViewSettings {
    margin: Margin;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_CATEGORY_LIST_VIEW_SETTINGS: CategoryListViewSettings = {
    margin: Margin.dense,
    thumbnailSize: ThumbnailSize.default,
};
