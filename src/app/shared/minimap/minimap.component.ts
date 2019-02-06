import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ExifData } from 'src/app/core/models/exif-data.model';

@Component({
    selector: 'app-minimap',
    templateUrl: './minimap.component.html',
    styleUrls: ['./minimap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimapComponent {
    @Input() exifData: ExifData[];
}
