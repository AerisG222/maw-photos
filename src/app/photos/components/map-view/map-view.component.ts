import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors, PhotoStoreActions } from '@core/root-store';
import { MapType } from '@models';
import { PhotoMapSettingsFacade } from '@core/facades/settings/photo-map-settings-facade';
import { AppSettingsFacade } from '@core/facades/settings/app-settings-facade';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-photos-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent {
    activePhoto$ = this.store.select(PhotoStoreSelectors.selectActivePhoto);
    mapImages$ = this.store.select(
        PhotoStoreSelectors.selectPhotosWithGpsCoordinatesAsMapImages
    );
    settings$ = this.mapSettings.settings$;
    appTheme$ = this.appSettings.settings$.pipe(map((x) => x.theme));

    constructor(
        private appSettings: AppSettingsFacade,
        private mapSettings: PhotoMapSettingsFacade,
        private store: Store
    ) {}

    onMapTypeIdChange(mapType: MapType): void {
        this.mapSettings.saveMapType(mapType);
    }

    onZoomChange(zoom: number): void {
        this.mapSettings.saveZoom(zoom);
    }

    onSelectPhoto(photoId: number): void {
        this.store.dispatch(
            PhotoStoreActions.setActivePhotoId({ id: photoId })
        );
    }
}
