import { DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS, VideoDetailViewSettings } from './video-detail-view-settings';

export interface VideoPageSettings {
    detailView: VideoDetailViewSettings;
}

export const DEFAULT_VIDEO_SETTINGS: VideoPageSettings = {
    detailView: DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS
};
