import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Photo } from 'src/app/core/models/photo.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'app-photo-select-grid',
    templateUrl: './photo-select-grid.component.html',
    styleUrls: ['./photo-select-grid.component.scss']
})
export class PhotoSelectGridComponent {
    @Input() photos: Photo[];
    @Input() selectedPhotos: Photo[];
    @Input() showPhotosWithGpsData = true;
    @Output() photoSelected = new EventEmitter<Photo>();
    @Output() photoDeselected = new EventEmitter<Photo>();

    trackByPhoto(index: number, photo: Photo): string {
        return !!photo ? null : photo.id.toString();
    }

    onToggle(evt: MatCheckboxChange, photo: Photo): void {
        if(evt.checked) {
            this.photoSelected.next(photo);
        } else {
            this.photoDeselected.next(photo);
        }
    }

    isSelected(photo: Photo): boolean {
        return this.getSelectedIndex(photo) >= 0;
    }

    private getSelectedIndex(photo: Photo): number {
        return this.selectedPhotos.findIndex(p => p.id === photo.id);
    }
}
