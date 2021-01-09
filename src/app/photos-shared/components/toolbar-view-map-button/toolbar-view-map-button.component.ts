import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, RouterStoreSelectors } from '@core/root-store';
import { RouteHelperService } from '@core/services/route-helper.service';

@Component({
    selector: 'app-toolbar-view-map-button',
    templateUrl: './toolbar-view-map-button.component.html',
    styleUrls: ['./toolbar-view-map-button.component.scss']
})
export class ToolbarViewMapButtonComponent {
    isActive$ = this.store.select(RouterStoreSelectors.isPhotosMapView);
    enableMapView$ = this.store.select(RouterStoreSelectors.isPhotosView);

    constructor(
        private store: Store
    ) {

    }

    onToggleMapView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelperService.photoViewMap }));
    }
}
