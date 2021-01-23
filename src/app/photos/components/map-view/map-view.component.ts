import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsStoreActions, SettingsStoreSelectors, PhotoStoreSelectors, PhotoStoreActions } from '@core/root-store';
import { MapType } from '@models';

@Component({
    selector: 'app-photos-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapViewComponent {
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    mapImages$ = this.store.select(PhotoStoreSelectors.photosWithGpsCoordinatesAsMapImages);
    settings$ = this.store.select(SettingsStoreSelectors.settings);

    constructor(private store: Store) {

    }

    onMapTypeIdChange(mapType: MapType): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoListMapViewMapTypeRequest({ mapType }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoListMapViewZoomRequest({ zoom }));
    }

    onSelectPhoto(photoId: number): void {
        this.store.dispatch(PhotoStoreActions.setActivePhotoId({ id: photoId }));
    }
}
