import { Component, ChangeDetectionStrategy, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Store, select } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';

import { GoogleMapThemes } from 'src/app/models/google-map-themes.model';
import { SettingsStoreSelectors } from 'src/app/core/root-store';
import { DEFAULT_SETTINGS } from 'src/app/models/settings.model';

@Component({
    selector: 'app-sidebar-minimap-card',
    templateUrl: './minimap-card.component.html',
    styleUrls: ['./minimap-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapCardComponent implements OnInit {
    private static readonly DEFAULT_CENTER = new google.maps.LatLng(0, 0);

    // arbitrarily use photo minimap settings by default
    minimapTypeId = DEFAULT_SETTINGS.photoInfoPanelMinimapMapTypeId;
    minimapZoom = DEFAULT_SETTINGS.photoInfoPanelMinimapZoom;
    options: google.maps.MapOptions | null = null;
    mapTheme: google.maps.MapTypeStyle[] = GoogleMapThemes.THEME_DARK;
    center = MinimapCardComponent.DEFAULT_CENTER;
    poi: google.maps.LatLng | null = null;

    @Input()
    set mapTypeId(value: string | null) {
        if (!!value) {
            this.minimapTypeId = value;
            this.updateOptions();
        }
    }

    @Input()
    set zoom(value: number | null) {
        if (!!value) {
            this.minimapZoom = value;
            this.updateOptions();
        }
    }

    @Input()
    set position(pos: google.maps.LatLng | null) {
        if (!!pos) {
            this.center = pos;
            this.poi = pos;
        } else {
            this.center = MinimapCardComponent.DEFAULT_CENTER;
            this.poi = null;
        }
    }

    @Output() mapTypeChange = new EventEmitter<string>();
    @Output() zoomChange = new EventEmitter<number>();

    @ViewChild(GoogleMap) map: GoogleMap | null = null;

    constructor(private store$: Store) {

    }

    ngOnInit(): void {
        this.store$.pipe(
            select(SettingsStoreSelectors.selectAppTheme),
            first(),
            tap(theme => this.mapTheme = theme.isDark ? GoogleMapThemes.THEME_DARK : GoogleMapThemes.THEME_LIGHT),
            tap(_ => this.updateOptions())
        ).subscribe();
    }

    onMapTypeChange(): void {
        if (!!this.map) {
            const mapTypeId = this.map.getMapTypeId();

            if (!!mapTypeId) {
                this.mapTypeChange.next(mapTypeId);
            }
        }
    }

    onZoomChange(): void {
        if (!!this.map) {
            const zoom = this.map.getZoom();

            if (!!zoom) {
                this.zoomChange.next(zoom);
            }
        }
    }

    private updateOptions(): void {
        const opts = {
            controlSize: 24,
            fullscreenControl: true,
            mapTypeControl: true,
            streetViewControl: false,
        } as google.maps.MapOptions;

        opts.mapTypeId = this.minimapTypeId;
        opts.styles = this.mapTheme;
        opts.zoom = this.minimapZoom;

        this.options = opts;
    }
}
