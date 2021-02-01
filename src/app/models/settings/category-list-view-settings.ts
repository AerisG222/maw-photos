import { CategoryMargin } from '../category-margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface CategoryListViewSettings {
    margin: CategoryMargin;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_CATEGORY_LIST_VIEW_SETTINGS: CategoryListViewSettings = {
    margin: CategoryMargin.dense,
    thumbnailSize: ThumbnailSize.default,
};
