import { Observable } from 'rxjs';
import { GpsCoordinate } from '../gps-coordinate.model';

export abstract class MetadataEditable {
    abstract overrideGps$: Observable<GpsCoordinate | null>;
    abstract sourceGps$: Observable<GpsCoordinate | null>;

    abstract saveGpsOverride(latLng: GpsCoordinate): void;
    abstract saveGpsOverrideAndMoveNext(latLng: GpsCoordinate): void;
}
