import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { VideoCategoryStoreSelectors } from '@core/root-store';
import { BaseStatsComponent } from '../base-stats/base-stats.component';
import { StatType } from '@models';

@Component({
    selector: 'app-stats-video-stats',
    templateUrl: './video-stats.component.html',
    styleUrls: ['./video-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoStatsComponent extends BaseStatsComponent {
    constructor(public store: Store) {
        super(store, StatType.videos, store.select(VideoCategoryStoreSelectors.totalStats));
    }
}
