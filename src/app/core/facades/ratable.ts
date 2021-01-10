import { Observable } from 'rxjs';

import { Rating } from '@models';

export abstract class Ratable {
    abstract rating$: Observable<Rating>;

    abstract rate(rating: number): void;
}
