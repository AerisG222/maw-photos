import { PhotoViewMode } from '../photo-view-mode.model';
import { DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS, PhotoDetailViewSettings } from './photo-detail-view-settings';
import { DEFAULT_PHOTO_GRID_VIEW_SETTINGS, PhotoGridViewSettings } from './photo-grid-view-settings';

export interface RandomSettings {
    viewMode: PhotoViewMode;

    detailView: PhotoDetailViewSettings;
    gridView: PhotoGridViewSettings;
}

export const DEFAULT_RANDOM_SETTINGS: RandomSettings = {
    viewMode: PhotoViewMode.grid,

    detailView: DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS,
    gridView: DEFAULT_PHOTO_GRID_VIEW_SETTINGS
};
