import { CategoryMargin } from '@models';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface SearchListViewSettings {
    margin: CategoryMargin;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_SEARCH_LIST_VIEW_SETTINGS: SearchListViewSettings = {
    margin: CategoryMargin.dense,
    thumbnailSize: ThumbnailSize.default
};
