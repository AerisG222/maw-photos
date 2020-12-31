import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouteHelperService } from 'src/app/core/services/route-helper.service';

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
