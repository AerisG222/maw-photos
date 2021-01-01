import { Observable } from 'rxjs';

export abstract class Navigable {
    abstract isFirst$: Observable<boolean>;
    abstract isLast$: Observable<boolean>;

    abstract moveNext(): void;
    abstract movePrevious(): void;
}
