import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoPageSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class PhotoPageSettingsFacade extends BaseSettingsFacade<PhotoPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.photoPageSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: PhotoPageSettings): void {
        this.store.dispatch(SettingsStoreActions.savePhotoPageSettings({ settings }));
    }
}
