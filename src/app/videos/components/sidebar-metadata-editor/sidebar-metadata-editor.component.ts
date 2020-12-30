import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { VideoStoreSelectors, VideoStoreActions } from 'src/app/videos/store';

@Component({
    selector: 'app-videos-sidebar-metadata-editor',
    templateUrl: './sidebar-metadata-editor.component.html',
    styleUrls: ['./sidebar-metadata-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMetadataEditorComponent {
    overrideGpsData$ = this.store.select(VideoStoreSelectors.activeVideoGpsDetailOverride);
    sourceGpsData$ = this.store.select(VideoStoreSelectors.activeVideoGpsDetailSource);

    constructor(
        private store: Store
    ) {

    }

    onSave(latLng: GpsCoordinate): void {
        this.store.select(VideoStoreSelectors.activeVideoId)
            .pipe(
                first()
            ).subscribe({
                next: id => {
                    if(!!id) {
                        this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideRequest({
                            videoId: id as number,
                            latLng
                        }));
                    }
                },
                error: err => console.log(`error trying to set gps coordinate: ${ err }`)
            });
    }

    onSaveAndMoveNext(latLng: GpsCoordinate): void {
        this.store.select(VideoStoreSelectors.activeVideoId)
            .pipe(
                first()
            ).subscribe({
                next: id => {
                    if(!!id) {
                        this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({
                            videoId: id as number,
                            latLng
                        }));
                    }
                },
                error: err => console.log(`error trying to set gps coordinate: ${ err }`)
            });
    }
}
