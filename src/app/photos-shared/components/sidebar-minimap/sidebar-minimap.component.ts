import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-sidebar-minimap',
    templateUrl: './sidebar-minimap.component.html',
    styleUrls: ['./sidebar-minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMinimapComponent {
    position$ = this.store.select(PhotoStoreSelectors.activePhotoGoogleLatLng);
    mapTypeId$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapMapTypeId);
    zoom$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapZoom);

    constructor(
        private store: Store
    ) {

    }

    onMapTypeChange(mapTypeId: string): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapZoomRequest({ zoom }));
    }
}
