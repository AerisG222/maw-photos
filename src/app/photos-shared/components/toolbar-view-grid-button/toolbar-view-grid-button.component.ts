import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, RouterStoreSelectors } from '@core/root-store';
import { RouteHelper } from '@models';

@Component({
    selector: 'app-toolbar-view-grid-button',
    templateUrl: './toolbar-view-grid-button.component.html',
    styleUrls: ['./toolbar-view-grid-button.component.scss']
})
export class ToolbarViewGridButtonComponent {
    isActive$ = this.store.select(RouterStoreSelectors.isPhotosGridView);

    constructor(
        private store: Store
    ) {

    }

    onToggleGridView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewGrid }));
    }
}
