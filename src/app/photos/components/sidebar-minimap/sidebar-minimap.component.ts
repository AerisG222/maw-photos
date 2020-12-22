import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PhotoStoreSelectors } from 'src/app/photos/store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-sidebar-minimap',
    templateUrl: './sidebar-minimap.component.html',
    styleUrls: ['./sidebar-minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMinimapComponent implements OnInit {
    mapTypeId$: Observable<string> | null = null;
    zoom$: Observable<number> | null = null;
    position$: Observable<google.maps.LatLng | null> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        const activePhoto$ = this.store
            .select(PhotoStoreSelectors.activePhoto)
            .pipe(
                filter(photo => !!photo)
            );

        this.position$ = activePhoto$
            .pipe(
                map(photo => {
                    if (!!photo && !!photo.latitude && photo.longitude) {
                        return new google.maps.LatLng(photo.latitude, photo.longitude);
                    }

                    return null;
                })
            );

        this.mapTypeId$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapMapTypeId);
        this.zoom$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapZoom);
    }

    onMapTypeChange(mapTypeId: string): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapZoomRequest({ zoom }));
    }
}
