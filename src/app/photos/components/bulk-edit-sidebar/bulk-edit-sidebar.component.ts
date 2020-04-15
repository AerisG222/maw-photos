import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { sidebarCardShow, sidebarCardHide } from 'src/app/shared/animations';

@Component({
    selector: 'app-photos-bulk-edit-sidebar',
    templateUrl: './bulk-edit-sidebar.component.html',
    styleUrls: ['./bulk-edit-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('toggleInfoPanel', [
            transition(':enter', [
                useAnimation(sidebarCardShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarCardHide)
            ])
        ])
    ]
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
