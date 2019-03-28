import { Theme } from './theme.model';
import { ThumbnailSize } from './thumbnail-size.model';
import { VideoSize } from './video-size.model';
import { CategoryMargin } from './category-margin.model';
import { CategoryFilter } from './category-filter.model';

export interface Settings {
    appTheme: Theme;

    categoryListCategoryFilter: CategoryFilter;
    categoryListCategoryMargin: CategoryMargin;
    categoryListShowCategoryTitles: boolean;
    categoryListThumbnailSize: ThumbnailSize;
    categoryListYearFilterEnabled: boolean;

    photoListShowCategoryBreadcrumbs: boolean;
    photoListThumbnailSize: ThumbnailSize;
    photoListShowPhotoList: boolean;
    photoListSlideshowDisplayDurationSeconds: number;
    photoListToolbarExpandedState: boolean;
    photoListFullscreenToolbarExpandedState: boolean;
    photoListMapViewMapTypeId: string;
    photoListMapViewZoom: number;

    photoInfoPanelShowRatings: boolean;
    photoInfoPanelShowComments: boolean;
    photoInfoPanelShowExif: boolean;
    photoInfoPanelShowEffects: boolean;
    photoInfoPanelShowHistogram: boolean;
    photoInfoPanelShowMinimap: boolean;
    photoInfoPanelExpandedState: boolean;
    photoInfoPanelMinimapZoom: number;
    photoInfoPanelMinimapMapTypeId: string;

    videoListShowCategoryBreadcrumbs: boolean;
    videoListThumbnailSize: ThumbnailSize;
    videoListShowVideoList: boolean;
    videoListToolbarExpandedState: boolean;
    videoListVideoSize: VideoSize;

    videoInfoPanelShowRatings: boolean;
    videoInfoPanelShowComments: boolean;
    videoInfoPanelShowMinimap: boolean;
    videoInfoPanelExpandedState: boolean;
    videoInfoPanelMinimapMapTypeId: string;
    videoInfoPanelMinimapZoom: number;
}
