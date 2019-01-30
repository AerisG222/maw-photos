import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';

@Component({
    selector: 'app-exif',
    templateUrl: './exif.component.html',
    styleUrls: ['./exif.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExifComponent {
    private exifDetail: ExifDetail;

    get exif(): ExifDetail {
        return this.exifDetail;
    }

    @Input('exif')
    set exif(value: ExifDetail) {
        this.exifDetail = value;
        this.transform(value);
    }

    exifData = [];
    columnsToDisplay = ['field', 'value'];

    transform(exif: ExifDetail): void {
        this.exifData = [];

        Object
            .keys(exif)
            .forEach(key => {
                if (exif[key]) {
                    this.exifData.push({ field: key, value: exif[key] });
                }
            });
    }
}
