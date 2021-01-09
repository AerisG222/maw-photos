import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelperService } from '@core/services';

@Component({
    selector: 'app-primary-nav-about-link',
    templateUrl: './about-link.component.html',
    styleUrls: ['./about-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutLinkComponent {
    aboutLink = this.routeHelperService.aboutAbs();

    constructor(private routeHelperService: RouteHelperService) {

    }
}
