import { PhotoViewMode } from '../photo-view-mode.model';

export interface RandomPageSettings {
    viewMode: PhotoViewMode;
    slideshowDisplayDurationSeconds: number;
}

export const DEFAULT_RANDOM_SETTINGS: RandomPageSettings = {
    viewMode: PhotoViewMode.grid,
    slideshowDisplayDurationSeconds: 2,
};
