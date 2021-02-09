import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { VideoInfoPanelSettings } from 'src/app/models/settings/video-info-panel-settings';

@Injectable({
    providedIn: 'root'
})
export class VideoInfoPanelSettingsFacade extends BaseSettingsFacade<VideoInfoPanelSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.videoInfoPanelSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: VideoInfoPanelSettings): void {
        this.store.dispatch(SettingsStoreActions.saveVideoInfoPanelSettings({ settings }));
    }
}
