import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { GpsCoordinate } from '../gps-coordinate.model';

export const helpSaveGpsOverride = (
    id$: Observable<number | null>,
    latLng: GpsCoordinate,
    saveGpsOverride: (id: number, latLng: GpsCoordinate) => void) => {
        id$.pipe(
            first()
        ).subscribe({
            next: id => {
                if(!!id) {
                    saveGpsOverride(id, latLng);
                }
            },
            error: err => console.log(`error trying to save gps override: ${ err }`)
        });
};
