import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { VideoStoreSelectors, VideoStoreActions } from 'src/app/videos/store';

@Component({
    selector: 'app-videos-sidebar-metadata-editor',
    templateUrl: './sidebar-metadata-editor.component.html',
    styleUrls: ['./sidebar-metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMetadataEditorComponent implements OnInit {
    overrideGpsData$: Observable<GpsCoordinate | null> | null = null;
    sourceGpsData$: Observable<GpsCoordinate | null> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.sourceGpsData$ = this.store
            .select(VideoStoreSelectors.activeVideoGpsDetail)
            .pipe(
                map(gps => gps?.source ?? null)
            );

        this.overrideGpsData$ = this.store
            .select(VideoStoreSelectors.activeVideoGpsDetail)
            .pipe(
                map(gps => gps?.override ?? null)
            );
    }

    onSave(latLng: GpsCoordinate): void {
        this.store.select(VideoStoreSelectors.activeVideoId)
            .pipe(
                first()
            ).subscribe({
                next: id => this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideRequest({ videoId: id as number, latLng })),
                error: err => console.log(`error trying to set gps coordinate: ${ err }`)
            });
    }

    onSaveAndMoveNext(latLng: GpsCoordinate): void {
        this.store.select(VideoStoreSelectors.activeVideoId)
            .pipe(
                first()
            ).subscribe({
                next: id => this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ videoId: id as number, latLng })),
                error: err => console.log(`error trying to set gps coordinate: ${ err }`)
            });
    }
}
