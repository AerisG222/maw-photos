import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-layout-empty',
    templateUrl: './empty.component.html',
    styleUrls: ['./empty.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {}
