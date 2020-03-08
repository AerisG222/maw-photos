import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { Category } from 'src/app/core/models/category.model';
import { LayoutStoreActions, PhotoCategoryStoreSelectors, PhotoStoreSelectors } from 'src/app/core/root-store';
import { Photo } from 'src/app/core/models/photo.model';
import { GpsService } from 'src/app/core/services/gps.service';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-photo-view-bulk-edit',
    templateUrl: './photo-view-bulk-edit.component.html',
    styleUrls: ['./photo-view-bulk-edit.component.scss']
})
export class PhotoViewBulkEditComponent implements OnInit, OnDestroy {
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    gpsForm: FormGroup;
    toggleSelectButtonText = 'Select All';

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder,
        private gps: GpsService
    ) {

    }

    ngOnInit(): void {
        this.gpsForm = this.formBuilder.group({
            latitude: ['', Validators.required],
            longitude: ['', Validators.required]
        });

        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategoryAsCategory)
            );

        this.photos$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos)
            );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());
    }

    onToggleSelectAll(): void {
        if(this.toggleSelectButtonText === 'Select All') {
            this.toggleSelectButtonText = 'Deselect All';
        } else {
            this.toggleSelectButtonText = 'Select All';
        }
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

    }

    onCancelGps(): void {
        this.updateGpsForm(null);
    }

    trackByPhoto(index: number, photo: Photo): string {
        return !!photo ? null : photo.id.toString();
    }

    private updateGpsForm(gps: GpsCoordinate): void {
        this.gpsForm.get('latitude').setValue(gps?.latitude);
        this.gpsForm.get('longitude').setValue(gps?.longitude);
    }
}
