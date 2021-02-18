import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export abstract class BaseSettingsFacade<T> {
    abstract settings$: Observable<T>;

    protected saveUpdatedField(action: (settings: T) => void) {
        this.settings$.pipe(first()).subscribe({
            next: (currentSettings) => {
                const newSettings = { ...currentSettings };
                action(newSettings);

                this.save(newSettings);
            },
        });
    }

    abstract save(settings: T): void;
}
