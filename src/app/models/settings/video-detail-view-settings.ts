import { ThumbnailSize } from '../thumbnail-size.model';
import { VideoSize } from '../video-size.model';

export interface VideoDetailViewSettings {
    showBreadcrumbs: boolean;
    thumbnailSize: ThumbnailSize;
    showVideoList: boolean;
    videoSize: VideoSize;
}

export const DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS: VideoDetailViewSettings = {
    showBreadcrumbs: true,
    thumbnailSize: ThumbnailSize.default,
    showVideoList: true,
    videoSize: VideoSize.small,
};
