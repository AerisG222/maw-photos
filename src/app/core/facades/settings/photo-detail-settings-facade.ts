import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { PhotoDetailViewSettings } from '@models';
import { BasePhotoDetailSettingsFacade } from './base-photo-detail-settings-facade';

@Injectable({
    providedIn: 'root'
})
export class PhotoDetailSettingsFacade extends BasePhotoDetailSettingsFacade {
    settings$ = this.store.select(SettingsStoreSelectors.photoDetailViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: PhotoDetailViewSettings): void {
        this.store.dispatch(SettingsStoreActions.savePhotoDetailViewSettings({ settings }));
    }
}
