import { Margin } from '../margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface CategoryListViewSettings {
    margin: Margin;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_CATEGORY_LIST_VIEW_SETTINGS: CategoryListViewSettings = {
    margin: Margin.dense,
    thumbnailSize: ThumbnailSize.default,
};
