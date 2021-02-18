import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelper } from '@models';

@Component({
    selector: 'app-primary-nav-about-link',
    templateUrl: './about-link.component.html',
    styleUrls: ['./about-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutLinkComponent {
    aboutLink = RouteHelper.aboutAbs();
}
