import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-photos-sidebar-exif',
    templateUrl: './sidebar-exif.component.html',
    styleUrls: ['./sidebar-exif.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarExifComponent {
    exifContainer$ = this.store.select(PhotoStoreSelectors.selectActivePhotoExifData);

    constructor(private store: Store) {}
}
