import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CategoryMargin } from '@models';

@Component({
    selector: 'app-settings-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
    margin = CategoryMargin.compact;
}
