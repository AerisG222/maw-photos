import { Component, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { GoogleMapThemes } from 'src/app/models/google-map-themes.model';
import { DEFAULT_SETTINGS } from 'src/app/models/settings.model';
import { MiniMapable } from 'src/app/models/store-facades/mini-mapable';
import { Subscription } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar-minimap-card',
    templateUrl: './minimap-card.component.html',
    styleUrls: ['./minimap-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapCardComponent implements OnDestroy {
    private static readonly defaultCenter = new google.maps.LatLng(0, 0);

    @ViewChild(GoogleMap) map: GoogleMap | null = null;

    // arbitrarily use photo minimap settings by default
    options = this.initOptions();
    center$ = this.miniMapable.position$
        .pipe(
            startWith(MinimapCardComponent.defaultCenter),
            filter(pos => !!pos)
        );
    poi$ = this.miniMapable.position$;

    private destroySub = new Subscription();

    constructor(
        public miniMapable: MiniMapable
    ) {
        this.destroySub.add(this.miniMapable.mapTypeId$
            .subscribe({
                next: mapTypeId => {
                    if (!!mapTypeId) {
                        this.options = {
                            ...this.options,
                            mapTypeId
                        };
                    }
                }
            })
        );

        this.destroySub.add(this.miniMapable.zoom$
            .subscribe({
                next: zoom => {
                    if(!!zoom) {
                        this.options = {
                            ...this.options,
                            zoom
                        };
                    }
                }
            })
        );

        this.destroySub.add(this.miniMapable.mapTheme$
            .subscribe({
                next: theme => {
                    if(!!theme) {
                        this.options = {
                            ...this.options,
                            styles: theme
                        };
                    }
                }
            })

        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onMapTypeChange(): void {
        if (!!this.map) {
            const mapTypeId = this.map.getMapTypeId();

            if (!!mapTypeId) {
                this.miniMapable.onMapTypeChange(mapTypeId);
            }
        }
    }

    onZoomChange(): void {
        if (!!this.map) {
            const zoom = this.map.getZoom();

            if (!!zoom) {
                this.miniMapable.onZoomChange(zoom);
            }
        }
    }

    private initOptions(): google.maps.MapOptions {
        const opts = {
            controlSize: 24,
            fullscreenControl: true,
            mapTypeControl: true,
            streetViewControl: false,
        } as google.maps.MapOptions;

        opts.mapTypeId = DEFAULT_SETTINGS.photoInfoPanelMinimapMapTypeId;
        opts.styles = GoogleMapThemes.themeDark;
        opts.zoom = DEFAULT_SETTINGS.photoInfoPanelMinimapZoom;

        return opts;
    }
}
