import { Observable } from 'rxjs';

export abstract class MiniMapable {
    abstract mapTypeId$: Observable<string>;
    abstract zoom$: Observable<number>;
    abstract position$: Observable<google.maps.LatLng | null>;
    abstract mapTheme$: Observable<google.maps.MapTypeStyle[]>;

    abstract onMapTypeChange(mapTypeId: string): void;
    abstract onZoomChange(zoom: number): void;
}
