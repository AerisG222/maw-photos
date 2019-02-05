import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ExifData } from 'src/app/core/models/exif-data.model';
import { ExifCategory } from 'src/app/core/models/exif-category.model';

@Component({
    selector: 'app-exif',
    templateUrl: './exif.component.html',
    styleUrls: ['./exif.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExifComponent {
    @Input() exifData: ExifData[];

    exifCategory = ExifCategory;

    getFilteredData(category: ExifCategory): ExifData[] {
        if (this.exifData) {
            return this.exifData.filter(e => e.category === category);
        }

        return [];
    }
}
