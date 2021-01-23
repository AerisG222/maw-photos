import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouteHelper } from '@models';

@Component({
    selector: 'app-primary-nav-stats-link',
    templateUrl: './stats-link.component.html',
    styleUrls: ['./stats-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsLinkComponent {
    statsLink = RouteHelper.statsAbs();
}
