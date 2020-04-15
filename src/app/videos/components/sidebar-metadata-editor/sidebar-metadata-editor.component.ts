import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { VideoStoreSelectors, VideoStoreActions } from 'src/app/videos/store';

@Component({
    selector: 'app-sidebar-metadata-editor',
    templateUrl: './sidebar-metadata-editor.component.html',
    styleUrls: ['./sidebar-metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMetadataEditorComponent implements OnInit {
    currentId = -1;
    overrideGpsData$: Observable<GpsCoordinate>;
    sourceGpsData$: Observable<GpsCoordinate>;
    destroySub = new Subscription();

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.sourceGpsData$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoGpsDetail),
                map(gps => gps?.source)
            );

        this.overrideGpsData$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoGpsDetail),
                map(gps => gps?.override)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video),
                tap(video => this.currentId = video.id),
                tap(video => this.store$.dispatch(VideoStoreActions.loadGpsDetailRequest({ videoId: video.id })))
            ).subscribe()
        );
    }

    onSave(latLng: GpsCoordinate): void {
        this.store$.dispatch(VideoStoreActions.setGpsCoordinateOverrideRequest({ videoId: this.currentId, latLng }));
    }

    onSaveAndMoveNext(latLng: GpsCoordinate): void {
        this.store$.dispatch(VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ videoId: this.currentId, latLng }));
    }
}
