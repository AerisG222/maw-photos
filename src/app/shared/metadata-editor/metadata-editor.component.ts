import { Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { MetadataEditorMode } from './metadata-editor-mode.model';
import { GpsCoordinate } from 'src/app/core/models/gps-coordinate.model';
import { PhotoStoreSelectors, VideoStoreSelectors, PhotoStoreActions, VideoStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-metadata-editor',
    templateUrl: './metadata-editor.component.html',
    styleUrls: ['./metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataEditorComponent implements OnInit, AfterViewInit {
    private destroySub = new Subscription();

    form: FormGroup;
    sourceGpsData$: Observable<GpsCoordinate>;

    @Input() mode: MetadataEditorMode;

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder
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
                select(PhotoStoreSelectors.selectCurrentPhotoSourceGpsCoordinates)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadExifRequest({ photoId: photo.id }))),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadGpsCoordinateOverrideRequest({ photoId: photo.id })))
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoGpsOverride),
                tap(gps => this.updateOverrideData(gps))
            ).subscribe()
        );
    }

    initVideoEditor(): void {
        this.sourceGpsData$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoSourceGps)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video),
                tap(video => this.store$.dispatch(VideoStoreActions.loadSourceGpsCoordinateRequest({ videoId: video.id }))),
                tap(video => this.store$.dispatch(VideoStoreActions.loadGpsCoordinateOverrideRequest({ videoId: video.id })))
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoGpsOverride),
                tap(gps => this.updateOverrideData(gps))
            ).subscribe()
        );
    }

    onPaste(evt: ClipboardEvent): void {
        const clipboardData = evt.clipboardData; // || window.clipboardData
        const pastedText = clipboardData.getData('text');

        if(!!pastedText) {
            const latLng = this.getLatLng(pastedText);

            if(!!latLng) {
                evt.preventDefault();

                this.updateOverrideData(latLng);
            }
        }
    }

    onSave(): void {

    }

    onCancel(): void {
        this.updateOverrideData(null);
    }

    private updateOverrideData(gps: GpsCoordinate): void {
        this.form.get('latitudeOverride').setValue(gps?.latitude);
        this.form.get('longitudeOverride').setValue(gps?.longitude);
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
            latitude: lat,
            longitude: lng
        };
    }
}
