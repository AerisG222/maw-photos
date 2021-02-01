import { MapType, ThumbnailSize } from '@models';
import { DEFAULT_PHOTO_INFO_PANEL_SETTINGS, PhotoInfoPanelSettings } from './photo-info-panel-settings';

export interface PhotoDetailViewSettings {
    showBreadcrumbs: boolean;
    thumbnailSize: ThumbnailSize;
    showPhotoList: boolean;
    slideshowDisplayDurationSeconds: number;

    infoPanel: PhotoInfoPanelSettings;
}

export const DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS: PhotoDetailViewSettings = {
    showBreadcrumbs: true,
    thumbnailSize: ThumbnailSize.default,
    showPhotoList: true,
    slideshowDisplayDurationSeconds: 2,

    infoPanel: DEFAULT_PHOTO_INFO_PANEL_SETTINGS
};
