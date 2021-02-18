import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './android.component.html',
    styleUrls: ['./android.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AndroidComponent {}
