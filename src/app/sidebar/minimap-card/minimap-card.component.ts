import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import {
    GoogleMapThemes,
    toMapType,
    Theme,
    DEFAULT_APP_SETTINGS,
    DEFAULT_PHOTO_INFO_PANEL_SETTINGS,
    toThemeDetail,
    MiniMapable,
} from '@models';
import { AppSettingsFacade } from '@core/facades/settings/app-settings-facade';

@Component({
    selector: 'app-sidebar-minimap-card',
    templateUrl: './minimap-card.component.html',
    styleUrls: ['./minimap-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimapCardComponent implements OnDestroy {
    private static readonly defaultCenter = new google.maps.LatLng(0, 0);

    @ViewChild(GoogleMap) map: GoogleMap | null = null;

    options = this.initOptions();
    center$ = this.miniMapable.position$.pipe(
        startWith(MinimapCardComponent.defaultCenter),
        filter((pos) => !!pos)
    );
    poi$ = this.miniMapable.position$;

    private destroySub = new Subscription();

    constructor(
        public miniMapable: MiniMapable,
        private appSettingsFacade: AppSettingsFacade
    ) {
        const opts$ = combineLatest([
            this.miniMapable.mapType$,
            this.miniMapable.zoom$,
            this.appSettingsFacade.settings$
        ]).pipe(
            map(([type, zoom, settings]) => {
                const opts = {...this.options};

                if(type) { opts.mapTypeId = type; }
                if(zoom) { opts.zoom = zoom; }
                if(settings) { opts.styles = this.getMapThemeForAppTheme(settings.theme); }

                return opts;
            })
        );

        this.destroySub.add(opts$.subscribe({
            next: (opts) => this.options = opts
        }));
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onMapTypeChange(): void {
        if (this.map) {
            const mapType = toMapType(this.map.getMapTypeId());

            if (mapType) {
                this.miniMapable.onMapTypeChange(mapType);
            }
        }
    }

    onZoomChange(): void {
        if (this.map) {
            const zoom = this.map.getZoom();

            if (zoom) {
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

        opts.mapTypeId = DEFAULT_PHOTO_INFO_PANEL_SETTINGS.minimapMapType;
        opts.styles = this.getMapThemeForAppTheme(DEFAULT_APP_SETTINGS.theme);
        opts.zoom = DEFAULT_PHOTO_INFO_PANEL_SETTINGS.minimapZoom;

        return opts;
    }

    private getMapThemeForAppTheme(theme: Theme) {
        const themeDetail = toThemeDetail(theme);

        return themeDetail.isDark
            ? GoogleMapThemes.themeDark
            : GoogleMapThemes.themeLight;
    }
}
