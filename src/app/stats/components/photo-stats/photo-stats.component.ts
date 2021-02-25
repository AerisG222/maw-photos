import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoCategoryStoreSelectors } from '@core/root-store';
import { BaseStatsComponent } from '../base-stats/base-stats.component';

@Component({
    selector: 'app-stats-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoStatsComponent extends BaseStatsComponent {
    constructor(public store: Store) {
        super(store, store.select(PhotoCategoryStoreSelectors.totalStats));
    }
}
