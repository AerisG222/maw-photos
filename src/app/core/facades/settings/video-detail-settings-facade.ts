import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { ThumbnailSize, VideoDetailViewSettings, VideoSize } from '@models';

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

    toggleBreadcrumbs(): void {
        this.saveUpdatedField(x => x.showBreadcrumbs = !x.showBreadcrumbs);
    }

    toggleThumbnailSize(): void {
        this.saveUpdatedField(x => {
            const sizeName = x.thumbnailSize.name;
            x.thumbnailSize = ThumbnailSize.nextSize(sizeName);
        });
    }

    toggleShowVideoList(): void {
        this.saveUpdatedField(x => x.showVideoList = !x.showVideoList);
    }

    toggleVideoSize(): void {
        this.saveUpdatedField(x => {
            const sizeName = x.videoSize.name;
            x.videoSize = VideoSize.nextSize(sizeName);
        });
    }
}
