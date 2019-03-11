import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapThemes } from 'src/app/core/models/google-map-themes';
import { MapTypeStyle } from '@agm/core';

@Component({
    selector: 'app-minimap',
    templateUrl: './minimap.component.html',
    styleUrls: ['./minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapComponent {
    @Input() lat: number;
    @Input() lng: number;
    @Input() zoom = 10;
    @Input() useDarkTheme = false;

    @Output() zoomChange = new EventEmitter<number>();

    onZoomChange(evt:  number) {
        this.zoomChange.emit(evt);
    }

    getMapTheme(): MapTypeStyle[] {
        if (this.useDarkTheme) {
            return GoogleMapThemes.THEME_DARK;
        } else {
            return GoogleMapThemes.THEME_LIGHT;
        }
    }
}
