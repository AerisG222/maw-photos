import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { MapTypeStyle } from '@agm/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { GoogleMapThemes } from 'src/app/core/models/google-map-themes.model';
import { SettingsStoreSelectors, PhotoStoreSelectors, SettingsStoreActions, VideoStoreSelectors } from 'src/app/core/root-store';
import { MinimapMode } from './minimap-mode.model';

@Component({
    selector: 'app-minimap',
    templateUrl: './minimap.component.html',
    styleUrls: ['./minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapComponent implements OnInit {
    @Input() mode: MinimapMode;

    latitude$: Observable<number>;
    longitude$: Observable<number>;
    minimapMapTypeId$: Observable<string>;
    minimapZoom$: Observable<number>;
    minimapTheme$: Observable<MapTypeStyle[]>;

    constructor(
        private store$: Store<{}>
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
    }

    initPhotosMinimap(): void {
        const currentPhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo)
        );

        this.latitude$ = currentPhoto$
            .pipe(
                map(photo => {
                    if (photo) {
                        return photo.latitude == null ? null : photo.latitude;
                    }

                    return null;
                })
            );

        this.longitude$ = currentPhoto$
            .pipe(
                map(photo => {
                    if (photo) {
                        return photo.longitude == null ? null : photo.longitude;
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

        this.latitude$ = currentVideo$
            .pipe(
                map(video => {
                    if (video) {
                        return video.latitude == null ? null : video.latitude;
                    }

                    return null;
                })
            );

        this.longitude$ = currentVideo$
            .pipe(
                map(video => {
                    if (video) {
                        return video.longitude == null ? null : video.longitude;
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

    onMapTypeChange(mapTypeId: string): void {
        if (this.mode === MinimapMode.Photos) {
            this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
        }

        if (this.mode === MinimapMode.Videos) {
            this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
        }
    }

    onZoomChange(zoom: number): void {
        if (this.mode === MinimapMode.Photos) {
            this.store$.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapZoomRequest({ zoom }));
        }

        if (this.mode === MinimapMode.Videos) {
            this.store$.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapZoomRequest({ zoom }));
        }
    }
}
