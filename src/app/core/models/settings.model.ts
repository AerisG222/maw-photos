import { Theme } from './theme.model';
import { ThumbnailSize } from './thumbnail-size.model';

export interface Settings {
    theme: Theme;
    showCategoryTitles: boolean;
    categoryThumbnailSize: ThumbnailSize;
}
