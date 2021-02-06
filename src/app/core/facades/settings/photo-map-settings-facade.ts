import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoMapViewSettings } from 'src/app/models/settings/photo-map-view-settings';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class PhotoMapSettingsFacade implements BaseSettingsFacade<PhotoMapViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.photoMapViewSettings);

    constructor(private store: Store) { }

    save(settings: PhotoMapViewSettings): void {
        this.store.dispatch(SettingsStoreActions.savePhotoMapViewSettings({ settings }));
    }
}
