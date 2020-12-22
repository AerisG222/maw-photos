import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { VideoStoreSelectors } from 'src/app/videos/store';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-videos-sidebar-minimap',
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
        const activeVideo$ = this.store
            .select(VideoStoreSelectors.activeVideo)
            .pipe(
                filter(video => !!video)
            );

        this.position$ = activeVideo$
            .pipe(
                map(video => {
                    if (!!video && !!video.latitude && video.longitude) {
                        return new google.maps.LatLng(video.latitude, video.longitude);
                    }

                    return null;
                })
            );

        this.mapTypeId$ = this.store.select(SettingsStoreSelectors.videoInfoPanelMinimapMapTypeId);
        this.zoom$ = this.store.select(SettingsStoreSelectors.videoInfoPanelMinimapZoom);
    }

    onMapTypeChange(mapTypeId: string): void {
        this.store.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapZoomRequest({ zoom }));
    }
}
