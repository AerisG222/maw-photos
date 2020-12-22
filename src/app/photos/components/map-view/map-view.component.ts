import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
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
    activePhoto$: Observable<Photo> | null = null;
    mapImages$: Observable<MapImage[]> | null = null;
    settings$: Observable<Settings> | null = null;

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.settings$ = this.store.select(SettingsStoreSelectors.selectSettings);

        this.activePhoto$ = this.store
            .select(PhotoStoreSelectors.selectActivePhoto)
            .pipe(
                filter(x => !!x),
                map(x => x as Photo)
            );

        this.mapImages$ = this.store
            .select(PhotoStoreSelectors.selectPhotosWithGpsCoordinates)
            .pipe(
                filter(x => !!x),
                map(photos => (photos as Photo[]).map(x => ({
                    id: x.id,
                    imageUrl: x.imageXsSq.url,
                    latitude: x.latitude,
                    longitude: x.longitude
                })))
            );
    }

    ngOnDestroy(): void {
        this.store.dispatch(PhotoStoreActions.exitMapViewRequest());
    }

    onMapTypeIdChange(mapTypeId: string): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoListMapViewMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoListMapViewZoomRequest({ zoom }));
    }

    onSelectPhoto(photoId: number): void {
        this.store.dispatch(PhotoStoreActions.setActivePhotoId({ id: photoId }));
    }
}
