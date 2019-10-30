import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { toolbarShow } from '../animations';
import { MapImage } from 'src/app/core/models/map-image.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Settings } from 'src/app/core/models/settings.model';
import {
    RootStoreState,
    PhotoStoreSelectors,
    SettingsStoreActions,
    SettingsStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-view-map',
    templateUrl: './photo-view-map.component.html',
    styleUrls: ['./photo-view-map.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoViewMapComponent implements OnInit {
    activePhoto$: Observable<Photo>;
    mapImages$: Observable<MapImage[]>;
    settings$: Observable<Settings>;

    constructor(
        private store$: Store<RootStoreState.State>
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

    onMapTypeIdChange(mapTypeId: string): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoListMapViewMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store$.dispatch(SettingsStoreActions.updatePhotoListMapViewZoomRequest({ zoom }));
    }
}
