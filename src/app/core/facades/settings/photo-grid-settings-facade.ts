import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoGridViewSettings } from 'src/app/models/settings/photo-grid-view-settings';
import { BasePhotoGridSettingsFacade } from './base-photo-grid-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class RandomGridSettingsFacade extends BasePhotoGridSettingsFacade {
    settings$ = this.store.select(SettingsStoreSelectors.randomGridViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: PhotoGridViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveRandomGridViewSettings({ settings }));
    }
}
