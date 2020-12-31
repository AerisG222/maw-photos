import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/core/root-store/photos-store';

@Component({
    selector: 'app-photos-bulk-edit-toolbar',
    templateUrl: './bulk-edit-toolbar.component.html',
    styleUrls: ['./bulk-edit-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkEditToolbarComponent {
    constructor(
        private store: Store
    ) { }

    onToggleBulkEditView(): void {
        this.store.dispatch(PhotoStoreActions.toggleBulkEditViewRequest());
    }
}
