import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store';
import { BaseSettingsFacade } from './base-settings-facade';
import { MapType, VideoInfoPanelSettings } from '@models';

@Injectable({
    providedIn: 'root',
})
export class VideoInfoPanelSettingsFacade extends BaseSettingsFacade<VideoInfoPanelSettings> {
    settings$ = this.store.select(
        SettingsStoreSelectors.selectVideoInfoPanelSettings
    );

    constructor(private store: Store) {
        super();
    }

    save(settings: VideoInfoPanelSettings): void {
        this.store.dispatch(
            SettingsStoreActions.saveVideoInfoPanelSettings({ settings })
        );
    }

    saveMinimapType(mapType: MapType): void {
        this.saveUpdatedField((x) => (x.minimapMapType = mapType));
    }

    saveMinimapZoom(zoom: number): void {
        this.saveUpdatedField((x) => (x.minimapZoom = zoom));
    }

    toggleSidebar(): void {
        this.saveUpdatedField((x) => (x.expandedState = !x.expandedState));
    }

    toggleRatings(): void {
        this.saveUpdatedField((x) => (x.showRatings = !x.showRatings));
    }

    toggleCategoryTeaserChooser(): void {
        this.saveUpdatedField(
            (x) => (x.showCategoryTeaserChooser = !x.showCategoryTeaserChooser)
        );
    }

    toggleComments(): void {
        this.saveUpdatedField((x) => (x.showComments = !x.showComments));
    }

    toggleMetadataEditor(): void {
        this.saveUpdatedField(
            (x) => (x.showMetadataEditor = !x.showMetadataEditor)
        );
    }

    toggleMinimap(): void {
        this.saveUpdatedField((x) => (x.showMinimap = !x.showMinimap));
    }
}
