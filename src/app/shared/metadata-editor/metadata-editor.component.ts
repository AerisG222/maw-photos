import { Component, EventEmitter, Input, OnInit, ChangeDetectionStrategy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { GpsService } from 'src/app/core/services/gps.service';

@Component({
    selector: 'app-metadata-editor',
    templateUrl: './metadata-editor.component.html',
    styleUrls: ['./metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataEditorComponent implements OnInit {
    @Input() sourceGpsData: GpsCoordinate;
    @Input() overrideGpsData: GpsCoordinate;
    @Output() save = new EventEmitter<GpsCoordinate>();
    @Output() saveAndMoveNext = new EventEmitter<GpsCoordinate>();

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private gps: GpsService
    ) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            latitudeOverride: ['', Validators.required],
            longitudeOverride: ['', Validators.required]
        });
    }

    onPaste(evt: ClipboardEvent): void {
        const clipboardData = evt.clipboardData; // || window.clipboardData
        const pastedText = clipboardData.getData('text');

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

        this.save.next(latLng);
    }

    onSaveAndMoveNext(): void {
        const latLng = this.getOverrideFromForm();

        if (latLng == null) {
            return;
        }

        this.saveAndMoveNext.next(latLng);
    }

    onCancel(): void {
        this.updateOverrideData(null);
    }

    private getOverrideFromForm(): GpsCoordinate {
        if (!this.form.valid) {
            return null;
        }

        const latitude = Number(this.form.get('latitudeOverride').value);
        const longitude = Number(this.form.get('longitudeOverride').value);

        if (isNaN(latitude) || isNaN(longitude)) {
            return null;
        }

        return { latitude, longitude};
    }

    private updateOverrideData(gps: GpsCoordinate): void {
        this.form.get('latitudeOverride').setValue(gps?.latitude);
        this.form.get('longitudeOverride').setValue(gps?.longitude);
    }
}
