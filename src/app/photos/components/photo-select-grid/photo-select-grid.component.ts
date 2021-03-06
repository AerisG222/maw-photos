import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';

import { Photo } from '@models';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'app-photos-photo-select-grid',
    templateUrl: './photo-select-grid.component.html',
    styleUrls: ['./photo-select-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoSelectGridComponent {
    @Input() photos: Photo[] | null = null;
    @Input() selectedPhotos: Photo[] | null = null;
    @Output() photoSelected = new EventEmitter<Photo>();
    @Output() photoDeselected = new EventEmitter<Photo>();

    trackByPhoto(index: number, photo: Photo): string {
        return photo.id.toString();
    }

    onToggle(evt: MatCheckboxChange, photo: Photo): void {
        this.setSelected(evt.checked, photo);
    }

    setSelected(checked: boolean, photo: Photo): void {
        if (checked) {
            this.photoSelected.next(photo);
        } else {
            this.photoDeselected.next(photo);
        }
    }

    isSelected(photo: Photo): boolean {
        return this.getSelectedIndex(photo) >= 0;
    }

    private getSelectedIndex(photo: Photo): number {
        if (this.selectedPhotos) {
            return this.selectedPhotos.findIndex((p) => p.id === photo.id);
        }

        return -1;
    }
}
