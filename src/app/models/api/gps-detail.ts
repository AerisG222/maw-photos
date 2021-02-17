import { GpsCoordinate } from './gps-coordinate';

export interface GpsDetail {
    source: GpsCoordinate;
    override: GpsCoordinate;
}
