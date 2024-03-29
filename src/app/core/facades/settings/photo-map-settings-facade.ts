import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { MapType, PhotoMapViewSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

@Injectable({
    providedIn: 'root',
})
export class PhotoMapSettingsFacade extends BaseSettingsFacade<PhotoMapViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.selectPhotoMapViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: PhotoMapViewSettings): void {
        this.store.dispatch(
            SettingsStoreActions.savePhotoMapViewSettings({ settings })
        );
    }

    saveMapType(mapType: MapType): void {
        this.saveUpdatedField((x) => (x.mapType = mapType));
    }

    saveZoom(zoom: number): void {
        this.saveUpdatedField((x) => (x.zoom = zoom));
    }
}
