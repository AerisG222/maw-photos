import { MapType } from '../map-type';

export interface PhotoInfoPanelSettings {
    showRatings: boolean;
    showCategoryTeaserChooser: boolean;
    showComments: boolean;
    showExif: boolean;
    showEffects: boolean;
    showMetadataEditor: boolean;
    showHistogram: boolean;
    showMinimap: boolean;
    expandedState: boolean;
    minimapZoom: number;
    minimapMapType: MapType;
}

export const DEFAULT_PHOTO_INFO_PANEL_SETTINGS: PhotoInfoPanelSettings = {
    showRatings: true,
    showCategoryTeaserChooser: false,
    showComments: true,
    showExif: false,
    showEffects: false,
    showHistogram: false,
    showMetadataEditor: false,
    showMinimap: false,
    expandedState: false,
    minimapMapType: MapType.roadmap,
    minimapZoom: 10,
};
