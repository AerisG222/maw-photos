import { GpsCoordinate } from '@models';

export const parseGps = (val: string): GpsCoordinate | null => {
    const parts = val
        .trim()
        .replace('[', '')
        .replace(']', '')
        .replace('(', '')
        .replace(')', '')
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
        longitude: lng,
    };
};
