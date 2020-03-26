import { Injectable } from '@angular/core';
import { GpsCoordinate } from '../models/gps-coordinate.model';

@Injectable({
    providedIn: 'root'
})
export class GpsService {
    parse(val: string): GpsCoordinate {
        const parts = val.trim()
            .replace('[', '').replace(']', '')
            .replace('(', '').replace(')', '')
            .split(',');

        if (parts.length !== 2) {
            return null;
        }

        const lat = Number(parts[0]);
        const lng = Number(parts[1]);

        if (isNaN(lat) || isNaN(lng)) {
            return null;
        }

        return {
            latitude: lat,
            longitude: lng
        };
    }
}
