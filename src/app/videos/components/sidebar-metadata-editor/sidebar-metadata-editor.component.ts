import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { VideoStoreSelectors, VideoStoreActions } from 'src/app/videos/store';
import { Video } from 'src/app/models/video.model';

@Component({
    selector: 'app-videos-sidebar-metadata-editor',
    templateUrl: './sidebar-metadata-editor.component.html',
    styleUrls: ['./sidebar-metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMetadataEditorComponent implements OnInit {
    activeId = -1;
    overrideGpsData$: Observable<GpsCoordinate | null> | null = null;
    sourceGpsData$: Observable<GpsCoordinate | null> | null = null;
    destroySub = new Subscription();

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

        this.destroySub.add(this.store
            .select(VideoStoreSelectors.activeVideo)
            .pipe(
                filter(video => !!video),
                map(video => video as Video),
                tap(video => this.activeId = video.id),
                tap(video => this.store.dispatch(VideoStoreActions.loadGpsDetailRequest({ videoId: video.id })))
            ).subscribe()
        );
    }

    onSave(latLng: GpsCoordinate): void {
        this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideRequest({ videoId: this.activeId, latLng }));
    }

    onSaveAndMoveNext(latLng: GpsCoordinate): void {
        this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ videoId: this.activeId, latLng }));
    }
}
