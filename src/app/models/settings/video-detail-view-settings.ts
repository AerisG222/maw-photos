import { ThumbnailSize } from '../thumbnail-size.model';
import { VideoSize } from '../video-size.model';
import { DEFAULT_VIDEO_INFO_PANEL_VIEW_SETTINGS, VideoInfoPanelSettings } from './video-info-panel-settings';

export interface VideoDetailViewSettings {
    showBreadcrumbs: boolean;
    thumbnailSize: ThumbnailSize;
    showVideoList: boolean;
    videoSize: VideoSize;

    infoPanel: VideoInfoPanelSettings;
}

export const DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS: VideoDetailViewSettings = {
    showBreadcrumbs: true,
    thumbnailSize: ThumbnailSize.default,
    showVideoList: true,
    videoSize: VideoSize.small,

    infoPanel: DEFAULT_VIDEO_INFO_PANEL_VIEW_SETTINGS
};
