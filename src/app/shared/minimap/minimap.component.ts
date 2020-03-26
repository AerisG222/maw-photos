import { Component, ChangeDetectionStrategy, OnInit, Input, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { GoogleMapThemes } from 'src/app/core/models/google-map-themes.model';
import { SettingsStoreSelectors, PhotoStoreSelectors, SettingsStoreActions, VideoStoreSelectors } from 'src/app/core/root-store';
import { MinimapMode } from './minimap-mode.model';
import { GoogleMap } from '@angular/google-maps';

@Component({
    selector: 'app-minimap',
    templateUrl: './minimap.component.html',
    styleUrls: ['./minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapComponent implements OnInit {
    @Input() mode: MinimapMode;

    @ViewChild(GoogleMap) map: GoogleMap;

    position$: Observable<google.maps.LatLng>;
    options$: Observable<google.maps.MapOptions>;
    minimapMapTypeId$: Observable<string>;
    minimapZoom$: Observable<number>;
    minimapTheme$: Observable<google.maps.MapTypeStyle[]>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.minimapTheme$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectAppTheme),
            map(theme => theme.isDark ? GoogleMapThemes.THEME_DARK : GoogleMapThemes.THEME_LIGHT)
        );

        switch (this.mode) {
            case MinimapMode.Photos:
                this.initPhotosMinimap();
                break;
            case MinimapMode.Videos:
                this.initVideosMinimap();
                break;
            default:
                throw new Error('invalid minimap mode!');
        }

        this.options$ = combineLatest([
            this.minimapMapTypeId$,
            this.minimapTheme$,
            this.minimapZoom$
        ]).pipe(
            map(x => ({
                controlSize: 24,
                fullscreenControl: true,
                mapTypeControl: true,
                streetViewControl: false,
                mapTypeId: x[0],
                styles: x[1],
                zoom: x[2]
            }))
        );
    }

    initPhotosMinimap(): void {
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

        this.minimapMapTypeId$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapMapTypeId)
        );

        this.minimapZoom$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelMinimapZoom)
        );
    }

    initVideosMinimap(): void {
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

        this.minimapMapTypeId$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapMapTypeId)
        );

        this.minimapZoom$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelMinimapZoom)
        );
    }

    onMapTypeChange(): void {
        if (!!this.map) {
            const mapTypeId = this.map.getMapTypeId();

            if (!!mapTypeId) {
                if (this.mode === MinimapMode.Photos) {
                    this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
                }

                if (this.mode === MinimapMode.Videos) {
                    this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
                }
            }
        }
    }

    onZoomChange(): void {
        if (!!this.map) {
            const zoom = this.map.getZoom();

            if (!!zoom) {
                if (this.mode === MinimapMode.Photos) {
                    this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapZoomRequest({ zoom }));
                }

                if (this.mode === MinimapMode.Videos) {
                    this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapZoomRequest({ zoom }));
                }
            }
        }
    }
}
