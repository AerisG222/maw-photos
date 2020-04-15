import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { MapImage } from 'src/app/models/map-image.model';
import { Photo } from 'src/app/models/photo.model';
import { Settings } from 'src/app/models/settings.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapViewComponent implements OnInit, OnDestroy {
    activePhoto$: Observable<Photo>;
    mapImages$: Observable<MapImage[]>;
    settings$: Observable<Settings>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit() {
        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.activePhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x)
            );

        this.mapImages$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectPhotosWithGpsCoordinates),
                map(photos => photos.map(x => ({
                    id: x.id,
                    imageUrl: x.imageXsSq.url,
                    latitude: x.latitude,
                    longitude: x.longitude
                })))
            );
    }

    ngOnDestroy(): void {
        this.store$.dispatch(PhotoStoreActions.exitMapViewRequest());
    }

    onMapTypeIdChange(mapTypeId): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoListMapViewMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoListMapViewZoomRequest({ zoom }));
    }

    onSelectPhoto(photoId: number): void {
        this.store$.dispatch(PhotoStoreActions.setCurrentById({ id: photoId }));
    }
}
