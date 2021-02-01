import { PhotoViewMode } from '../photo-view-mode.model';
import { DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS, PhotoDetailViewSettings } from './photo-detail-view-settings';
import { DEFAULT_PHOTO_GRID_VIEW_SETTINGS, PhotoGridViewSettings } from './photo-grid-view-settings';
import { DEFAULT_PHOTO_MAP_VIEW_SETTINGS, PhotoMapViewSettings } from './photo-map-view-settings';

export interface PhotoSettings {
    viewMode: PhotoViewMode;

    detailView: PhotoDetailViewSettings;
    gridView: PhotoGridViewSettings;
    mapView: PhotoMapViewSettings;
}

export const DEFAULT_PHOTO_SETTINGS: PhotoSettings = {
    viewMode: PhotoViewMode.grid,

    detailView: DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS,
    gridView: DEFAULT_PHOTO_GRID_VIEW_SETTINGS,
    mapView: DEFAULT_PHOTO_MAP_VIEW_SETTINGS
};
