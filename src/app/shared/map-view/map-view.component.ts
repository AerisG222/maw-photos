import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MapTypeStyle } from '@agm/core';

import { MapImage } from 'src/app/core/models/map-image.model';
import { Photo } from 'src/app/core/models/photo.model';
import { GoogleMapThemes } from 'src/app/core/models/google-map-themes.model';

// TODO: evaluate moving to @angular/google-maps once available

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapViewComponent {
    @Input() activePhoto: Photo;
    @Input() images: MapImage[];
    @Input() mapTypeId: 'roadmap';
    @Input() zoom = 10;
    @Input() useDarkTheme = false;

    @Output() mapTypeChange = new EventEmitter<number>();
    @Output() zoomChange = new EventEmitter<number>();

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
