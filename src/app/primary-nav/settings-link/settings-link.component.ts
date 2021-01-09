import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelperService } from '@core/services';

@Component({
    selector: 'app-primary-nav-settings-link',
    templateUrl: './settings-link.component.html',
    styleUrls: ['./settings-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLinkComponent {
    settingsLink = this.routeHelperService.settingsAbs();

    constructor(private routeHelperService: RouteHelperService) {

    }
}
