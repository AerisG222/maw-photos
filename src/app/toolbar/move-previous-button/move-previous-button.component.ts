import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Navigable } from '@models';

@Component({
    selector: 'app-toolbar-move-previous-button',
    templateUrl: './move-previous-button.component.html',
    styleUrls: ['./move-previous-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovePreviousButtonComponent {
    constructor(public navigable: Navigable) {}
}
