import { Margin } from '../margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface SearchListViewSettings {
    margin: Margin;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_SEARCH_LIST_VIEW_SETTINGS: SearchListViewSettings = {
    margin: Margin.dense,
    thumbnailSize: ThumbnailSize.default
};
