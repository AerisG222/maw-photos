import { Margin } from 'src/app/models/margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface SearchGridViewSettings {
    margin: Margin;
    showTitles: boolean;
    showYears: boolean;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_SEARCH_GRID_VIEW_SETTINGS: SearchGridViewSettings = {
    showTitles: true,
    showYears: true,
    margin: Margin.dense,
    thumbnailSize: ThumbnailSize.default
};
