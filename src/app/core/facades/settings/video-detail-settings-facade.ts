import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { VideoDetailViewSettings } from '@models';

@Injectable({
    providedIn: 'root'
})
export class VideoDetailSettingsFacade extends BaseSettingsFacade<VideoDetailViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.videoDetailViewSettings);

    constructor(private store: Store) {
        super();
    }

    save(settings: VideoDetailViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveVideoDetailViewSettings({ settings }));
    }
}
