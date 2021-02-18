import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions } from '@core/root-store';

@Injectable({
    providedIn: 'root',
})
export class SettingsFacade {
    constructor(private store: Store) {}

    load() {
        this.store.dispatch(SettingsStoreActions.loadRequest());
    }
}
