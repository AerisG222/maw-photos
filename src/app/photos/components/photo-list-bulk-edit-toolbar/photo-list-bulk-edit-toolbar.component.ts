import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-photo-list-bulk-edit-toolbar',
    templateUrl: './photo-list-bulk-edit-toolbar.component.html',
    styleUrls: ['./photo-list-bulk-edit-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListBulkEditToolbarComponent {
    constructor(
        private store$: Store
    ) { }

    onToggleBulkEditView(): void {
        this.store$.dispatch(PhotoStoreActions.toggleBulkEditViewRequest());
    }
}
