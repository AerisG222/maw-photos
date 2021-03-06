import { PhotoViewMode } from '../photo-view-mode';

export interface PhotoPageSettings {
    viewMode: PhotoViewMode;
    slideshowDisplayDurationSeconds: number;
}

export const DEFAULT_PHOTO_SETTINGS: PhotoPageSettings = {
    viewMode: PhotoViewMode.grid,
    slideshowDisplayDurationSeconds: 2,
};
