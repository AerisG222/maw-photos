import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { GpsDetail } from 'src/app/models/gps-detail.model';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-sidebar-metadata-editor',
    templateUrl: './sidebar-metadata-editor.component.html',
    styleUrls: ['./sidebar-metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMetadataEditorComponent implements OnInit {
    currentId = -1;
    overrideGpsData$: Observable<GpsCoordinate | null> | null = null;
    sourceGpsData$: Observable<GpsCoordinate | null> | null = null;
    destroySub = new Subscription();

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.sourceGpsData$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoGpsDetail),
                filter(x => !!x),
                map(gpsDetail => gpsDetail?.source ?? null)
            );

        this.overrideGpsData$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoGpsDetail),
                map(gpsDetail => gpsDetail?.override ?? null)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                map(photo => photo as Photo),
                tap(photo => this.currentId = photo.id),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadExifRequest({ photoId: photo.id }))),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadGpsDetailRequest({ photoId: photo.id })))
            ).subscribe()
        );
    }

    onSave(latLng: GpsCoordinate): void {
        this.store$.dispatch(PhotoStoreActions.setGpsCoordinateOverrideRequest({ photoId: this.currentId, latLng }));
    }

    onSaveAndMoveNext(latLng: GpsCoordinate): void {
        this.store$.dispatch(PhotoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ photoId: this.currentId, latLng }));
    }
}
