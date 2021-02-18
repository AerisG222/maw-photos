import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import {
    nextThumbnailSize,
    nextVideoSize,
    VideoDetailViewSettings,
} from '@models';

@Injectable({
    providedIn: 'root',
})
export class VideoDetailSettingsFacade extends BaseSettingsFacade<VideoDetailViewSettings> {
    settings$ = this.store.select(
        SettingsStoreSelectors.videoDetailViewSettings
    );

    constructor(private store: Store) {
        super();
    }

    save(settings: VideoDetailViewSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveVideoDetailViewSettings({ settings })
        );
    }

    toggleBreadcrumbs(): void {
        this.saveUpdatedField((x) => (x.showBreadcrumbs = !x.showBreadcrumbs));
    }

    toggleThumbnailSize(): void {
        this.saveUpdatedField(
            (x) => (x.thumbnailSize = nextThumbnailSize(x.thumbnailSize))
        );
    }

    toggleShowVideoList(): void {
        this.saveUpdatedField((x) => (x.showVideoList = !x.showVideoList));
    }

    toggleVideoSize(): void {
        this.saveUpdatedField(
            (x) => (x.videoSize = nextVideoSize(x.videoSize))
        );
    }
}
