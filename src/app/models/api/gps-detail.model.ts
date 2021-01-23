import { GpsCoordinate } from './gps-coordinate.model';

export interface GpsDetail {
    source: GpsCoordinate;
    override: GpsCoordinate;
}
