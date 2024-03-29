import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors } from '@core/root-store';
import { GpsCoordinate, parseGps } from '@models';

@Component({
    selector: 'app-photos-bulk-edit-gps-editor',
    templateUrl: './bulk-edit-gps-editor.component.html',
    styleUrls: ['./bulk-edit-gps-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkEditGpsEditorComponent {
    @Output() saveGps = new EventEmitter<GpsCoordinate>();

    gpsForm: UntypedFormGroup;
    hasPendingEdits$ = this.store.select(PhotoStoreSelectors.selectHasPendingActions);

    constructor(private store: Store, private formBuilder: UntypedFormBuilder) {
        this.gpsForm = this.formBuilder.group({
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
        });
    }

    onPaste(evt: ClipboardEvent): void {
        const clipboardData = evt.clipboardData; // || window.clipboardData

        if (clipboardData) {
            const pastedText = clipboardData.getData('text');

            if (pastedText) {
                const latLng = parseGps(pastedText);

                if (latLng) {
                    evt.preventDefault();

                    this.updateGpsForm(latLng);
                }
            }
        }
    }

    onSaveGps(): void {
        const coords = this.getGpsCoordinateFromForm();

        if (coords != null) {
            this.saveGps.emit(coords);
        }
    }

    onCancelGps(): void {
        this.updateGpsForm(null);
    }

    private getGpsCoordinateFromForm(): GpsCoordinate | null {
        if (!this.gpsForm.valid) {
            return null;
        }

        const latitude = Number(this.gpsForm.get('latitude')?.value);
        const longitude = Number(this.gpsForm.get('longitude')?.value);

        if (isNaN(latitude) || isNaN(longitude)) {
            return null;
        }

        return { latitude, longitude };
    }

    private updateGpsForm(gps: GpsCoordinate | null): void {
        this.gpsForm.get('latitude')?.setValue(gps?.latitude);
        this.gpsForm.get('longitude')?.setValue(gps?.longitude);
    }
}
