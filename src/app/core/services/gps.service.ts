import { Injectable } from '@angular/core';
import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';

@Injectable({
    providedIn: 'root'
})
export class GpsService {
    parse(val: string): GpsCoordinate | undefined {
        const parts = val.trim()
            .replace('[', '').replace(']', '')
            .replace('(', '').replace(')', '')
            .split(',');

        if (parts.length !== 2) {
            return undefined;
        }

        const lat = Number(parts[0]);
        const lng = Number(parts[1]);

        if (isNaN(lat) || isNaN(lng)) {
            return undefined;
        }

        return {
            latitude: lat,
            longitude: lng
        };
    }
}
