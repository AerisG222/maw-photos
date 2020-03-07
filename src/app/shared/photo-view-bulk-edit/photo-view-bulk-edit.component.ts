import { Component, OnInit } from '@angular/core';
import { LayoutStoreActions } from 'src/app/core/root-store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-photo-view-bulk-edit',
    templateUrl: './photo-view-bulk-edit.component.html',
    styleUrls: ['./photo-view-bulk-edit.component.scss']
})
export class PhotoViewBulkEditComponent implements OnInit {
    constructor(
        private store$: Store<{}>
    ) {

    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.openRightSidebarRequest());
    }
}
