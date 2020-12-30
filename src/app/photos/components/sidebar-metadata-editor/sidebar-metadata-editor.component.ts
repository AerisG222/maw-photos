import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-sidebar-metadata-editor',
    templateUrl: './sidebar-metadata-editor.component.html',
    styleUrls: ['./sidebar-metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMetadataEditorComponent {
    overrideGpsData$ = this.store.select(PhotoStoreSelectors.activePhotoGpsDetailOverride);
    sourceGpsData$ = this.store.select(PhotoStoreSelectors.activePhotoGpsDetailSource);

    constructor(
        private store: Store
    ) {

    }

    onSave(latLng: GpsCoordinate): void {
        this.store.select(PhotoStoreSelectors.activePhotoId)
            .pipe(
                first()
            ).subscribe({
                next: id => {
                    if(!!id) {
                        this.store.dispatch(PhotoStoreActions.setGpsCoordinateOverrideRequest({ photoId: id as number, latLng }));
                    }
                },
                error: err => console.log(`error trying to save gps override: ${ err }`)
            });
    }

    onSaveAndMoveNext(latLng: GpsCoordinate): void {
        this.store.select(PhotoStoreSelectors.activePhotoId)
            .pipe(
                first()
            ).subscribe({
                next: id => {
                    if(!!id) {
                        // eslint-disable-next-line max-len
                        this.store.dispatch(PhotoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ photoId: id as number, latLng }));
                    }
                },
                error: err => console.log(`error trying to save gps override: ${ err }`)
            });
    }
}
