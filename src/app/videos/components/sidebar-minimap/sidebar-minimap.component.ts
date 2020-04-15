import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { VideoStoreSelectors } from 'src/app/videos/store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-sidebar-minimap',
    templateUrl: './sidebar-minimap.component.html',
    styleUrls: ['./sidebar-minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
        const currentVideo$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video)
            );

        this.position$ = currentVideo$
            .pipe(
                map(video => {
                    if (!!video && !!video.latitude && video.longitude) {
                        return new google.maps.LatLng(video.latitude, video.longitude);
                    }

                    return null;
                })
            );

        this.mapTypeId$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapMapTypeId)
        );

        this.zoom$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapZoom)
        );
    }

    onMapTypeChange(mapTypeId): void {
        this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapZoomRequest({ zoom }));
    }
}
