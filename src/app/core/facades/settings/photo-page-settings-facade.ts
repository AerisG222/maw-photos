import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoPageSettings } from 'src/app/models/settings/photo-page-settings';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class PhotoPageSettingsFacade implements BaseSettingsFacade<PhotoPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.photoPageSettings);

    constructor(private store: Store) { }

    save(settings: PhotoPageSettings): void {
        this.store.dispatch(SettingsStoreActions.savePhotoPageSettings({ settings }));
    }
}
