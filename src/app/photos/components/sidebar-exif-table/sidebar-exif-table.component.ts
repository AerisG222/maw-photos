import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ExifData } from 'src/app/models/exif-data.model';

@Component({
  selector: 'app-photos-sidebar-exif-table',
  templateUrl: './sidebar-exif-table.component.html',
  styleUrls: ['./sidebar-exif-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarExifTableComponent {
    @Input() exifData: ExifData[];

    columnsToDisplay = [ 'displayName', 'displayValue' ];
}
