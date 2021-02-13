import { CategoryMargin } from 'src/app/models/category-margin.model';
import { ThumbnailSize } from '../thumbnail-size.model';

export interface SearchGridViewSettings {
    margin: CategoryMargin;
    showTitles: boolean;
    showYears: boolean;
    thumbnailSize: ThumbnailSize;
}

export const DEFAULT_SEARCH_GRID_VIEW_SETTINGS: SearchGridViewSettings = {
    showTitles: true,
    showYears: true,
    margin: CategoryMargin.dense,
    thumbnailSize: ThumbnailSize.default
};
