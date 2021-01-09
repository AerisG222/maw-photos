import { MapMarker } from '@angular/google-maps';

import { MapImage } from '@models/map-image.model';

export interface MapMarkerInfo {
    marker: MapMarker;
    image: MapImage;
}
