import { Component, ChangeDetectionStrategy, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Store, select } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';

import { GoogleMapThemes } from 'src/app/models/google-map-themes.model';
import { SettingsStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-sidebar-minimap-card',
    templateUrl: './minimap-card.component.html',
    styleUrls: ['./minimap-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapCardComponent implements OnInit {
    private minimapTypeId: string;
    private minimapZoom: number;

    @Input()
    set mapTypeId(value: string) { this.minimapTypeId = value; this.updateOptions(); }
    get mapTypeId(): string { return this.minimapTypeId; }

    @Input()
    set zoom(value: number) { this.minimapZoom = value; this.updateOptions(); }
    get zoom(): number { return this.minimapZoom; }

    @Input() position: google.maps.LatLng;

    @Output() mapTypeChange = new EventEmitter<string>();
    @Output() zoomChange = new EventEmitter<number>();

    @ViewChild(GoogleMap) map: GoogleMap;

    options: google.maps.MapOptions;
    mapTheme: google.maps.MapTypeStyle[];

    constructor(
        private store$: Store
    ) {

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
            streetViewControl: false
        } as google.maps.MapOptions;

        if (!!this.mapTypeId) {
            opts.mapTypeId = this.mapTypeId;
        }

        if (!!this.mapTheme) {
            opts.styles = this.mapTheme;
        }

        if (!!this.zoom) {
            opts.zoom = this.zoom;
        }

        this.options = opts;
    }
}
