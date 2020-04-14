import { Component, ChangeDetectionStrategy, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';

import { GoogleMapThemes } from 'src/app/models/google-map-themes.model';
import { SettingsStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-minimap',
    templateUrl: './minimap.component.html',
    styleUrls: ['./minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapComponent implements OnInit {
    private _mapTypeId: string;
    private _zoom: number;

    @Input()
    set mapTypeId(value: string) { this._mapTypeId = value; this.updateOptions(); }
    get mapTypeId(): string { return this._mapTypeId; }

    @Input()
    set zoom(value: number) { this._zoom = value; this.updateOptions(); }
    get zoom(): number { return this._zoom; }

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
