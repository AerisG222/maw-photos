import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

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

    @Output() zoomChange = new EventEmitter<number>();

    onZoomChange(evt:  number) {
        this.zoomChange.emit(evt);
    }
}
