import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, RouterStoreSelectors } from 'src/app/core/root-store';
import { RouteHelperService } from 'src/app/core/services/route-helper.service';

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
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelperService.photoViewGrid }));
    }
}
