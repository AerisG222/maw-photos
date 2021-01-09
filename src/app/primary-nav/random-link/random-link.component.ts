import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelperService } from '@core/services/route-helper.service';

@Component({
    selector: 'app-primary-nav-random-link',
    templateUrl: './random-link.component.html',
    styleUrls: ['./random-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomLinkComponent {
    randomLink = this.routeHelperService.randomAbs();

    constructor(private routeHelperService: RouteHelperService) {

    }
}
