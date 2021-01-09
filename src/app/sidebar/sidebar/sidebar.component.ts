import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LayoutStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-sidebar-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    hidePanel$ = this.store.select(LayoutStoreSelectors.isFullscreen);

    constructor(
        private store: Store
    ) {

    }
}
