import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';
import { PhotoViewMode, RouteHelper } from '@models';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';

@Component({
    selector: 'app-toolbar-view-bulk-edit-button',
    templateUrl: './toolbar-view-bulk-edit-button.component.html',
    styleUrls: ['./toolbar-view-bulk-edit-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarViewBulkEditButtonComponent {
    @Input() isActive = false;

    constructor(
        private store: Store,
        private viewMode: PhotoViewModeSelectable
    ) {

    }

    onToggleBulkEditView(): void {
        this.store.dispatch(PhotoStoreActions.changeViewRequest({ view: RouteHelper.photoViewBulkEdit }));
        this.viewMode.selectPhotoViewMode(PhotoViewMode.bulkEdit);
    }
}
