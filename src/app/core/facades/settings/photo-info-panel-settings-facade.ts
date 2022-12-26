import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoInfoPanelSettings } from '@models';
import { BasePhotoInfoPanelSettingsFacade } from './base-photo-info-panel-facade';

@Injectable({
    providedIn: 'root',
})
export class PhotoInfoPanelSettingsFacade extends BasePhotoInfoPanelSettingsFacade {
    settings$ = this.store.select(
        SettingsStoreSelectors.selectPhotoInfoPanelSettings
    );

    constructor(private store: Store) {
        super();
    }

    save(settings: PhotoInfoPanelSettings): void {
        this.store.dispatch(
            SettingsStoreActions.savePhotoInfoPanelSettings({ settings })
        );
    }
}
