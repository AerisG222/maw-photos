import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoMapViewSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class PhotoMapSettingsFacade extends BaseSettingsFacade<PhotoMapViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.photoMapViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: PhotoMapViewSettings): void {
        this.store.dispatch(SettingsStoreActions.savePhotoMapViewSettings({ settings }));
    }
}
