import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {
    version = environment.version;
}
