import { Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

import { MetadataEditorMode } from './metadata-editor-mode.model';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';
import { PhotoStoreSelectors, VideoStoreSelectors, PhotoStoreActions, VideoStoreActions } from 'src/app/core/root-store';
import { GpsService } from 'src/app/core/services/gps.service';

@Component({
    selector: 'app-metadata-editor',
    templateUrl: './metadata-editor.component.html',
    styleUrls: ['./metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataEditorComponent implements OnInit, AfterViewInit {
    private destroySub = new Subscription();
    private id: number;

    form: FormGroup;
    sourceGpsData$: Observable<GpsCoordinate>;

    @Input() mode: MetadataEditorMode;

    constructor(
        private store$: Store<{}>,
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

    ngAfterViewInit(): void {
        switch (this.mode) {
            case MetadataEditorMode.Photos:
                this.initPhotoEditor();
                break;
            case MetadataEditorMode.Videos:
                this.initVideoEditor();
                break;
            default:
                throw new Error('invalid metadata editor mode!');
        }
    }

    initPhotoEditor(): void {
        this.sourceGpsData$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoGpsDetail),
                map(gpsDetail => gpsDetail?.source)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                tap(photo => this.id = photo.id),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadExifRequest({ photoId: photo.id }))),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadGpsDetailRequest({ photoId: photo.id })))
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoGpsDetail),
                tap(gpsDetail => this.updateOverrideData(gpsDetail?.override))
            ).subscribe()
        );
    }

    initVideoEditor(): void {
        this.sourceGpsData$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoGpsDetail),
                map(gps => gps?.source)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video),
                tap(video => this.id = video.id),
                tap(video => this.store$.dispatch(VideoStoreActions.loadGpsDetailRequest({ videoId: video.id })))
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoGpsDetail),
                tap(gpsDetail => this.updateOverrideData(gpsDetail?.override))
            ).subscribe()
        );
    }

    onPaste(evt: ClipboardEvent): void {
        const clipboardData = evt.clipboardData; // || window.clipboardData
        const pastedText = clipboardData.getData('text');

        if(!!pastedText) {
            const latLng = this.gps.parse(pastedText);

            if(!!latLng) {
                evt.preventDefault();

                this.updateOverrideData(latLng);
            }
        }
    }

    onSave(): void {
        const latLng = this.getOverrideFromForm();

        if(latLng == null) {
            return;
        }

        switch (this.mode) {
            case MetadataEditorMode.Photos:
                this.store$.dispatch(PhotoStoreActions.setGpsCoordinateOverrideRequest({ photoId: this.id, latLng }));
                break;
            case MetadataEditorMode.Videos:
                this.store$.dispatch(VideoStoreActions.setGpsCoordinateOverrideRequest({ videoId: this.id, latLng }));
                break;
            default:
                throw new Error('invalid metadata editor mode!');
        }
    }

    onSaveAndMoveNext(): void {
        const latLng = this.getOverrideFromForm();

        if(latLng == null) {
            return;
        }

        switch (this.mode) {
            case MetadataEditorMode.Photos:
                this.store$.dispatch(PhotoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ photoId: this.id, latLng }));
                break;
            case MetadataEditorMode.Videos:
                this.store$.dispatch(VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ videoId: this.id, latLng }));
                break;
            default:
                throw new Error('invalid metadata editor mode!');
        }
    }

    onCancel(): void {
        this.updateOverrideData(null);
    }

    private getOverrideFromForm(): GpsCoordinate {
        if(!this.form.valid) {
            return null;
        }

        const latitude = Number(this.form.get('latitudeOverride').value);
        const longitude = Number(this.form.get('longitudeOverride').value);

        if(isNaN(latitude) || isNaN(longitude)) {
            return null;
        }

        return { latitude, longitude};
    }

    private updateOverrideData(gps: GpsCoordinate): void {
        this.form.get('latitudeOverride').setValue(gps?.latitude);
        this.form.get('longitudeOverride').setValue(gps?.longitude);
    }
}
