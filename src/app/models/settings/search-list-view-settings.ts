import { Margin } from '../margin';
import { ThumbnailSize } from '../thumbnail-size';

export interface SearchListViewSettings {
    margin: Margin;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_SEARCH_LIST_VIEW_SETTINGS: SearchListViewSettings = {
    margin: Margin.dense,
    thumbnailSize: ThumbnailSize.default
};
