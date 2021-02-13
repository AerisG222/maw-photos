import { Observable } from 'rxjs';

import { MapType } from '@models';

export abstract class MiniMapable {
    abstract mapType$: Observable<MapType>;
    abstract zoom$: Observable<number>;
    abstract position$: Observable<google.maps.LatLng | null>;

    abstract onMapTypeChange(mapType: MapType): void;
    abstract onZoomChange(zoom: number): void;
}
