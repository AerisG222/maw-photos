import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { VideoPageSettings } from 'src/app/models/settings/video-page-settings';

@Injectable({
    providedIn: 'root'
})
export class VideoPageSettingsFacade implements BaseSettingsFacade<VideoPageSettings> {
    settings$ = this.store.select(SettingsStoreSelectors.videoPageSettings);

    constructor(private store: Store) { }

    save(settings: VideoPageSettings): void {
        this.store.dispatch(SettingsStoreActions.saveVideoPageSettings({ settings }));
    }
}
