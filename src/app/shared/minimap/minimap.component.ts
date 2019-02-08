import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-minimap',
    templateUrl: './minimap.component.html',
    styleUrls: ['./minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapComponent {
    @Input() lat: number;
    @Input() lng: number;
}
