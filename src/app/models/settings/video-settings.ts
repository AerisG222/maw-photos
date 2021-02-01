import { DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS, VideoDetailViewSettings } from './video-detail-view-settings';

export interface VideoSettings {
    detailView: VideoDetailViewSettings;
}

export const DEFAULT_VIDEO_SETTINGS: VideoSettings = {
    detailView: DEFAULT_VIDEO_DETAIL_VIEW_SETTINGS
};
