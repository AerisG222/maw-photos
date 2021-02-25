import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RootStoreSelectors } from '@core/root-store';
import { StatType } from '@models';
import { Store } from '@ngrx/store';
import { BaseStatsComponent } from '../base-stats/base-stats.component';

@Component({
    selector: 'app-stats-combined-stats',
    templateUrl: './combined-stats.component.html',
    styleUrls: ['./combined-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedStatsComponent extends BaseStatsComponent {
    constructor(public store: Store) {
        super(store, StatType.combined, store.select(RootStoreSelectors.combinedTotalStats));
    }
}
