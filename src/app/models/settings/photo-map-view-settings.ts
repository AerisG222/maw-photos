import { MapType } from 'src/app/models/map-type';

export interface PhotoMapViewSettings {
    mapType: MapType;
    zoom: number;
}

export const DEFAULT_PHOTO_MAP_VIEW_SETTINGS: PhotoMapViewSettings = {
    mapType: MapType.roadmap,
    zoom: 10,
};
