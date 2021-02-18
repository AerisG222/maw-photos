import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export const helpMoveNext = (
    isLast$: Observable<boolean>,
    moveNext: () => void
) => {
    isLast$.pipe(first()).subscribe({
        next: (isLast) => {
            if (!isLast) {
                moveNext();
            }
        },
    });
};

export const helpMovePrevious = (
    isFirst$: Observable<boolean>,
    movePrevious: () => void
) => {
    isFirst$.pipe(first()).subscribe({
        next: (isFirst) => {
            if (!isFirst) {
                movePrevious();
            }
        },
    });
};
