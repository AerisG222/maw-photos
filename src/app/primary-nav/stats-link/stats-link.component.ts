import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelperService } from 'src/app/core/services/route-helper.service';

@Component({
    selector: 'app-primary-nav-stats-link',
    templateUrl: './stats-link.component.html',
    styleUrls: ['./stats-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsLinkComponent {
    statsLink = this.routeHelperService.statsAbs();

    constructor(private routeHelperService: RouteHelperService) {

    }
}
