import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PhotoStoreSelectors } from 'src/app/photos/store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-sidebar-minimap',
    templateUrl: './sidebar-minimap.component.html',
    styleUrls: ['./sidebar-minimap.component.scss']
})
export class SidebarMinimapComponent implements OnInit {
    mapTypeId$: Observable<string>;
    zoom$: Observable<number>;
    position$: Observable<google.maps.LatLng>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        const currentPhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo)
            );

        this.position$ = currentPhoto$
            .pipe(
                map(photo => {
                    if (!!photo && !!photo.latitude && photo.longitude) {
                        return new google.maps.LatLng(photo.latitude, photo.longitude);
                    }

                    return null;
                })
            );

        this.mapTypeId$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapMapTypeId)
        );

        this.zoom$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapZoom)
        );
    }

    onMapTypeChange(mapTypeId: string): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapZoomRequest({ zoom }));
    }
}
