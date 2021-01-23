import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouteHelper } from '@models';

@Component({
    selector: 'app-primary-nav-settings-link',
    templateUrl: './settings-link.component.html',
    styleUrls: ['./settings-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLinkComponent {
    settingsLink = RouteHelper.settingsAbs();
}
