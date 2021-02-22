import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouteHelper } from '@models';

@Component({
    selector: 'app-primary-nav-random-link',
    templateUrl: './random-link.component.html',
    styleUrls: ['./random-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomLinkComponent {
    randomLink = RouteHelper.randomAbs();
}
