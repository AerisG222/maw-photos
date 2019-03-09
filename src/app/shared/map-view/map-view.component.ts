import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapImage } from 'src/app/core/models/map-image';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent {
    @Input() images: MapImage[];
    @Input() zoom = 10;

    @Output() zoomChange = new EventEmitter<number>();

    onZoomChange(evt:  number) {
        this.zoomChange.emit(evt);
    }
}
