import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LayoutStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-primary-nav-primary-nav',
    templateUrl: './primary-nav.component.html',
    styleUrls: ['./primary-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryNavComponent {
    hideNav$ = this.store.select(LayoutStoreSelectors.isFullscreen);

    constructor(
        private store: Store
    ) {

    }
}
