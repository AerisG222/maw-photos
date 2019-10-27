import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MapTypeStyle } from '@agm/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GoogleMapThemes } from 'src/app/core/models/google-map-themes.model';
import { RootStoreState, SettingsStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-minimap',
    templateUrl: './minimap.component.html',
    styleUrls: ['./minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapComponent implements OnInit {
    latitude$: Observable<number>;
    longitude$: Observable<number>;
    minimapMapTypeId$: Observable<string>;
    minimapZoom$: Observable<number>;
    minimapUseDarkTheme$: Observable<boolean>;

    @Input() lat: number;
    @Input() lng: number;
    @Input() mapTypeId: 'roadmap';
    @Input() zoom = 10;
    @Input() useDarkTheme = false;

    @Output() mapTypeChange = new EventEmitter<number>();
    @Output() zoomChange = new EventEmitter<number>();

    constructor(
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit(): void {
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

        this.minimapUseDarkTheme$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectAppTheme),
            map(theme => theme.isDark)
        );
    }

    onZoomChange(evt: number) {
        this.zoomChange.emit(evt);
    }

    onMapTypeChange(evt: number) {
        this.mapTypeChange.emit(evt);
    }

    getMapTheme(): MapTypeStyle[] {
        if (this.useDarkTheme) {
            return GoogleMapThemes.THEME_DARK;
        } else {
            return GoogleMapThemes.THEME_LIGHT;
        }
    }
}
