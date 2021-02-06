import { Observable } from 'rxjs';

export interface BaseSettingsFacade<T> {
    settings$: Observable<T>;

    save(settings: T): void;
}
