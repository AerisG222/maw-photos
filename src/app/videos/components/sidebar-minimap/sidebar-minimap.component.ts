import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { VideoStoreSelectors } from 'src/app/videos/store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-videos-sidebar-minimap',
    templateUrl: './sidebar-minimap.component.html',
    styleUrls: ['./sidebar-minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMinimapComponent {
    mapTypeId$ = this.store.select(SettingsStoreSelectors.videoInfoPanelMinimapMapTypeId);
    zoom$ = this.store.select(SettingsStoreSelectors.videoInfoPanelMinimapZoom);
    position$ = this.store.select(VideoStoreSelectors.activeVideoGoogleLatLng);

    constructor(
        private store: Store
    ) {

    }

    onMapTypeChange(mapTypeId: string): void {
        this.store.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapZoomRequest({ zoom }));
    }
}
