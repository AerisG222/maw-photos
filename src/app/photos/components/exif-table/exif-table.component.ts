import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ExifData } from 'src/app/models/exif-data.model';

@Component({
  selector: 'app-exif-table',
  templateUrl: './exif-table.component.html',
  styleUrls: ['./exif-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExifTableComponent {
    @Input() exifData: ExifData[];

    columnsToDisplay = [ 'displayName', 'displayValue' ];
}
