import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { VideoDetailViewSettings } from 'src/app/models/settings/video-detail-view-settings';

@Injectable({
    providedIn: 'root'
})
export class VideoDetailSettingsFacade implements BaseSettingsFacade<VideoDetailViewSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.videoDetailViewSettings);

    constructor(private store: Store) { }

    save(settings: VideoDetailViewSettings): void {
        this.store.dispatch(SettingsStoreActions.saveVideoDetailViewSettings({ settings }));
    }
}
