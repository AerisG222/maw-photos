import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoGridViewSettings } from '@models';
import { BasePhotoGridSettingsFacade } from './base-photo-grid-settings-facade';

@Injectable({
    providedIn: 'root',
})
export class RandomGridSettingsFacade extends BasePhotoGridSettingsFacade {
    settings$ = this.store.select(
        SettingsStoreSelectors.selectRandomGridViewSettings
    );

    constructor(private store: Store) {
        super();
    }

    save(settings: PhotoGridViewSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveRandomGridViewSettings({ settings })
        );
    }
}
