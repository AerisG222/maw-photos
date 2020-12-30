import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';
import { SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapViewComponent implements OnDestroy {
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    mapImages$ = this.store.select(PhotoStoreSelectors.photosWithGpsCoordinatesAsMapImages);
    settings$ = this.store.select(SettingsStoreSelectors.settings);

    constructor(private store: Store) {

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
