import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GpsService } from 'src/app/core/services/gps.service';
import { PhotoStoreSelectors } from 'src/app/core/root-store';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';

@Component({
    selector: 'app-bulk-edit-gps-editor',
    templateUrl: './bulk-edit-gps-editor.component.html',
    styleUrls: ['./bulk-edit-gps-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkEditGpsEditorComponent implements OnInit {
    gpsForm: FormGroup;
    hasPendingEdits$: Observable<boolean>;

    @Output() saveGps = new EventEmitter<GpsCoordinate>();

    constructor(
        private store$: Store,
        private formBuilder: FormBuilder,
        private gps: GpsService
    ) { }

    ngOnInit(): void {
        this.gpsForm = this.formBuilder.group({
            latitude: ['', Validators.required],
            longitude: ['', Validators.required]
        });

        this.hasPendingEdits$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectPendingActionCount),
                map(c => c > 0)
            );
    }

    onPaste(evt: ClipboardEvent): void {
        const clipboardData = evt.clipboardData; // || window.clipboardData
        const pastedText = clipboardData.getData('text');

        if(!!pastedText) {
            const latLng = this.gps.parse(pastedText);

            if(!!latLng) {
                evt.preventDefault();

                this.updateGpsForm(latLng);
            }
        }
    }

    onSaveGps(): void {
        const coords = this.getGpsCoordinateFromForm();

        if(coords != null) {
            this.saveGps.emit(coords);
        }
    }

    onCancelGps(): void {
        this.updateGpsForm(null);
    }

    private getGpsCoordinateFromForm(): GpsCoordinate {
        if(!this.gpsForm.valid) {
            return null;
        }

        const latitude = Number(this.gpsForm.get('latitude').value);
        const longitude = Number(this.gpsForm.get('longitude').value);

        if(isNaN(latitude) || isNaN(longitude)) {
            return null;
        }

        return { latitude, longitude};
    }

    private updateGpsForm(gps: GpsCoordinate): void {
        this.gpsForm.get('latitude').setValue(gps?.latitude);
        this.gpsForm.get('longitude').setValue(gps?.longitude);
    }
}
