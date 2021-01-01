import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/core/root-store/photos-store';

@Component({
    selector: 'app-photos-map-toolbar',
    templateUrl: './map-toolbar.component.html',
    styleUrls: ['./map-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapToolbarComponent {
    constructor(
        private store: Store
    ) {

    }

    onToggleMapView(): void {
        this.store.dispatch(PhotoStoreActions.toggleMapViewRequest());
    }
}
