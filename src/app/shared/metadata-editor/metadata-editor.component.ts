import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MetadataEditorMode } from './metadata-editor-mode.model';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';
import { PhotoStoreSelectors, VideoStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-metadata-editor',
    templateUrl: './metadata-editor.component.html',
    styleUrls: ['./metadata-editor.component.scss']
})
export class MetadataEditorComponent implements OnInit {
    form: FormGroup;
    sourceGpsData$: Observable<GpsCoordinate>;
    overrideGpsData$: Observable<GpsCoordinate>;

    @Input() mode: MetadataEditorMode;

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {
        switch (this.mode) {
            case MetadataEditorMode.Photos:
                this.initPhotoEditor();
                break;
            case MetadataEditorMode.Videos:
                this.initVideoEditor();
                break;
            default:
                throw new Error('invalid comment mode!');
        }

        this.form = this.formBuilder.group({
            latitudeOverride: ['', Validators.required],
            longitudeOverride: ['', Validators.required]
        });
    }

    initPhotoEditor(): void {
        this.sourceGpsData$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                map(photo => ({
                    lat: photo.latitude,
                    lng: photo.longitude
                }))
            );

        this.overrideGpsData$ = null;
    }

    initVideoEditor(): void {
        this.sourceGpsData$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                map(video => ({
                    lat: video.latitude,
                    lng: video.longitude
                }))
            );

        this.overrideGpsData$ = null;
    }

    onPaste(evt: ClipboardEvent): void {
        const clipboardData = evt.clipboardData; // || window.clipboardData
        const pastedText = clipboardData.getData('text');

        if(!!pastedText) {
            const latLng = this.getLatLng(pastedText);

            if(!!latLng) {
                evt.preventDefault();

                this.form.get('latitudeOverride').setValue(latLng.lat);
                this.form.get('longitudeOverride').setValue(latLng.lng);
            }
        }
    }

    onSave(): void {

    }

    onCancel(): void {

    }

    private getLatLng(val: string): GpsCoordinate {
        const parts = val.trim()
            .replace('[', '').replace(']', '')
            .replace('(', '').replace(')', '')
            .split(',');

        if(parts.length !== 2) {
            return null;
        }

        const lat = Number(parts[0]);
        const lng = Number(parts[1]);

        if(isNaN(lat) || isNaN(lng)) {
            return null;
        }

        return {
            lat,
            lng
        };
    }
}
