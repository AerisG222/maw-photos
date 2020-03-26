import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-list-bulk-edit-toolbar',
    templateUrl: './photo-list-bulk-edit-toolbar.component.html',
    styleUrls: ['./photo-list-bulk-edit-toolbar.component.scss']
})
export class PhotoListBulkEditToolbarComponent {
    constructor(
        private store$: Store
    ) { }

    onToggleBulkEditView(): void {
        this.store$.dispatch(PhotoStoreActions.toggleBulkEditViewRequest());
    }
}
