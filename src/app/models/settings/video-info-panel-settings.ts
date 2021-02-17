import { MapType } from 'src/app/models/map-type';

export interface VideoInfoPanelSettings {
    showRatings: boolean;
    showCategoryTeaserChooser: boolean;
    showComments: boolean;
    showMetadataEditor: boolean;
    showMinimap: boolean;
    expandedState: boolean;
    minimapMapType: MapType;
    minimapZoom: number;
}

export const DEFAULT_VIDEO_INFO_PANEL_SETTINGS: VideoInfoPanelSettings = {
    showRatings: true,
    showCategoryTeaserChooser: false,
    showComments: true,
    showMetadataEditor: false,
    showMinimap: false,
    expandedState: false,
    minimapMapType: MapType.roadmap,
    minimapZoom: 10,
};
