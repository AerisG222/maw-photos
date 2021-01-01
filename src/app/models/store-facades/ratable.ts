import { Observable } from 'rxjs';

import { Rating } from '../rating.model';

export abstract class Ratable {
    abstract rating$: Observable<Rating>;

    abstract rate(rating: number): void;
}
