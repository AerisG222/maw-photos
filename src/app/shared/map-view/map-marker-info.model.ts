import { MapMarker } from '@angular/google-maps';

import { MapImage } from 'src/app/core/models/map-image.model';

export interface MapMarkerInfo {
    marker: MapMarker;
    image: MapImage;
}
