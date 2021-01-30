import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';
import { RouteHelper } from '@models';

@Component({
    selector: 'app-toolbar-view-bulk-edit-button',
    templateUrl: './toolbar-view-bulk-edit-button.component.html',
    styleUrls: ['./toolbar-view-bulk-edit-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewBulkEditButtonComponent {
    @Input() isActive = false;

    constructor(
        private store: Store
    ) {

    }

    onToggleBulkEditView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewBulkEdit }));
    }
}
