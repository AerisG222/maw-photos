import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GpsCoordinate } from '@models';
import { GpsService } from '@core/services';
import { MetadataEditable } from '@core/facades';

@Component({
    selector: 'app-sidebar-metadata-editor-card',
    templateUrl: './metadata-editor-card.component.html',
    styleUrls: ['./metadata-editor-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataEditorCardComponent {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private gps: GpsService,
        public metadataEditable: MetadataEditable
    ) {
        this.form = this.formBuilder.group({
            latitudeOverride: ['', Validators.required],
            longitudeOverride: ['', Validators.required]
        });
    }

    onPaste(evt: ClipboardEvent): void {
        const clipboardData = evt.clipboardData; // || window.clipboardData
        const pastedText = clipboardData?.getData('text');

        if (!!pastedText) {
            const latLng = this.gps.parse(pastedText);

            if (!!latLng) {
                evt.preventDefault();

                this.updateOverrideData(latLng);
            }
        }
    }

    onSave(): void {
        const latLng = this.getOverrideFromForm();

        if (latLng == null) {
            return;
        }

        this.metadataEditable.saveGpsOverride(latLng);
    }

    onSaveAndMoveNext(): void {
        const latLng = this.getOverrideFromForm();

        if (latLng == null) {
            return;
        }

        this.metadataEditable.saveGpsOverrideAndMoveNext(latLng);
    }

    onCancel(): void {
        this.updateOverrideData(null);
    }

    private getOverrideFromForm(): GpsCoordinate | null {
        if (!this.form.valid) {
            return null;
        }

        const latitude = Number(this.form.get('latitudeOverride')?.value);
        const longitude = Number(this.form.get('longitudeOverride')?.value);

        if (isNaN(latitude) || isNaN(longitude)) {
            return null;
        }

        return { latitude, longitude};
    }

    private updateOverrideData(gps: GpsCoordinate | null): void {
        this.form.get('latitudeOverride')?.setValue(gps?.latitude);
        this.form.get('longitudeOverride')?.setValue(gps?.longitude);
    }
}
