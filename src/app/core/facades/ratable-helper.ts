import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export const helpRate = (
    id$: Observable<number | null>,
    rating: number,
    rate: (id: number, rating: number) => void
): void => {
    id$.pipe(first()).subscribe({
        next: (id) => {
            if (id) {
                rate(id, rating);
            }
        },
        error: (err) => console.log(`error trying to set rating: ${err}`),
    });
};
