import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterStoreSelectors } from '@core/root-store';
import { RouteHelper } from '@models';

@Component({
    selector: 'app-primary-nav-random-link',
    templateUrl: './random-link.component.html',
    styleUrls: ['./random-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomLinkComponent {
    randomLink = RouteHelper.randomAbs();
    inRandomArea$ = this.store.select(RouterStoreSelectors.inRandomArea);

    constructor(private store: Store) {}
}
