import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, RouterStoreSelectors } from '@core/root-store';
import { RouteHelperService } from '@core/services';

@Component({
    selector: 'app-toolbar-view-bulk-edit-button',
    templateUrl: './toolbar-view-bulk-edit-button.component.html',
    styleUrls: ['./toolbar-view-bulk-edit-button.component.scss']
})
export class ToolbarViewBulkEditButtonComponent {
    isActive$ = this.store.select(RouterStoreSelectors.isPhotosBulkEditView);
    enableBulkEdit$ = this.store.select(RouterStoreSelectors.isPhotosView);

    constructor(
        private store: Store
    ) {

    }

    onToggleBulkEditView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelperService.photoViewBulkEdit }));
    }
}
