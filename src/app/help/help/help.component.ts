import { Component, ChangeDetectionStrategy } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-help-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent {
    version = environment.version;
}
