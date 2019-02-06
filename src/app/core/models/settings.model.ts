import { Theme } from './theme.model';
import { ThumbnailSize } from './thumbnail-size.model';

export interface Settings {
    theme: Theme;
    showCategoryTitles: boolean;
    showCategoryBreadcrumbs: boolean;
    categoryThumbnailSize: ThumbnailSize;
    photoListThumbnailSize: ThumbnailSize;
    showCategoryPhotoList: boolean;
    randomDisplayDurationSeconds: number;
    photoInfoPanelShowRatings: boolean;
    photoInfoPanelShowComments: boolean;
    photoInfoPanelShowExif: boolean;
    photoInfoPanelShowEffects: boolean;
    photoInfoPanelShowMinimap: boolean;
    photoListToolbarExpandedState: boolean;
}
