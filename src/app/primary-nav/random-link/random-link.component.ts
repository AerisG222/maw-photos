import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterStoreSelectors } from '@core/root-store';
import { RouteHelperService } from '@core/services';

@Component({
    selector: 'app-primary-nav-random-link',
    templateUrl: './random-link.component.html',
    styleUrls: ['./random-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomLinkComponent {
    randomLink = this.routeHelperService.randomAbs();
    inRandomArea$ = this.store.select(RouterStoreSelectors.isRandomView);

    constructor(
        private routeHelperService: RouteHelperService,
        private store: Store
    ) { }
}
