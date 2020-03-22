import { Component, EventEmitter, ChangeDetectionStrategy, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-bulk-edit-filter',
  templateUrl: './bulk-edit-filter.component.html',
  styleUrls: ['./bulk-edit-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkEditFilterComponent {
    @Output() showPhotosWithGpsData = new EventEmitter<boolean>();
    @Output() selectAllPhotos = new EventEmitter<boolean>();

    onToggleSelectAll(evt: boolean): void {
        this.selectAllPhotos.emit(evt);
    }

    onToggleHidePhotosWithGpsData(evt: MatCheckboxChange): void {
        this.showPhotosWithGpsData.emit(!evt.checked);
    }
}
