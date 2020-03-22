import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';

@Component({
    selector: 'app-bulk-edit-panel',
    templateUrl: './bulk-edit-panel.component.html',
    styleUrls: ['./bulk-edit-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkEditPanelComponent {
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
