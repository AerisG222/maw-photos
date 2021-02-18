import {
    Component,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { GpsCoordinate } from '@models';
import { sidebarShow, sidebarHide } from '@shared/animations';

@Component({
    selector: 'app-photos-bulk-edit-sidebar',
    templateUrl: './bulk-edit-sidebar.component.html',
    styleUrls: ['./bulk-edit-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('sidebarFlyInOut', [
            transition(':enter', [useAnimation(sidebarShow)]),
            transition(':leave', [useAnimation(sidebarHide)]),
        ]),
    ],
})
export class BulkEditSidebarComponent {
    @Output() showPhotosWithGpsData = new EventEmitter<boolean>();
    @Output() selectAllPhotos = new EventEmitter<boolean>();
    @Output() saveGps = new EventEmitter<GpsCoordinate>();

    onToggleSelectAll(evt: boolean): void {
        this.selectAllPhotos.emit(evt);
    }

    onToggleHidePhotosWithGpsData(evt: boolean): void {
        this.showPhotosWithGpsData.emit(evt);
    }

    onSaveGps(evt: GpsCoordinate): void {
        this.saveGps.emit(evt);
    }
}
