import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent {}
