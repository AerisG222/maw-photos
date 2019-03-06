import { Theme } from './theme.model';
import { ThumbnailSize } from './thumbnail-size.model';
import { VideoSize } from './video-size.model';

export interface Settings {
    appTheme: Theme;

    categoryListShowCategoryTitles: boolean;
    categoryListThumbnailSize: ThumbnailSize;

    photoListShowCategoryBreadcrumbs: boolean;
    photoListThumbnailSize: ThumbnailSize;
    photoListShowPhotoList: boolean;
    photoListSlideshowDisplayDurationSeconds: number;
    photoListToolbarExpandedState: boolean;
    photoListFullscreenToolbarExpandedState: boolean;

    photoInfoPanelShowRatings: boolean;
    photoInfoPanelShowComments: boolean;
    photoInfoPanelShowExif: boolean;
    photoInfoPanelShowEffects: boolean;
    photoInfoPanelShowMinimap: boolean;
    photoInfoPanelExpandedState: boolean;
    photoInfoPanelMinimapZoom: number;

    videoListShowCategoryBreadcrumbs: boolean;
    videoListThumbnailSize: ThumbnailSize;
    videoListShowVideoList: boolean;
    videoListToolbarExpandedState: boolean;
    videoListVideoSize: VideoSize;

    videoInfoPanelShowRatings: boolean;
    videoInfoPanelShowComments: boolean;
    videoInfoPanelShowMinimap: boolean;
    videoInfoPanelExpandedState: boolean;
    videoInfoPanelMinimapZoom: number;
}
