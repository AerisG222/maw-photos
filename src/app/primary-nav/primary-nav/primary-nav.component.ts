import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LayoutStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-primary-nav-primary-nav',
    templateUrl: './primary-nav.component.html',
    styleUrls: ['./primary-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryNavComponent {
    hideNav$ = this.store.select(LayoutStoreSelectors.selectIsFullscreen);

    constructor(private store: Store) {}
}
