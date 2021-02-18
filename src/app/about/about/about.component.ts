import { Component, ChangeDetectionStrategy } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
    version = environment.version;
}
