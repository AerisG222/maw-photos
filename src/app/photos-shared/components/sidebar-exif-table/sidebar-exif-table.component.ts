import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ExifData } from '@models';

@Component({
    selector: 'app-photos-sidebar-exif-table',
    templateUrl: './sidebar-exif-table.component.html',
    styleUrls: ['./sidebar-exif-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarExifTableComponent {
    @Input() exifData: ExifData[] | null = null;

    columnsToDisplay = ['displayName', 'displayValue'];
}
