import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Navigable } from '@core/facades';

@Component({
    selector: 'app-toolbar-move-next-button',
    templateUrl: './move-next-button.component.html',
    styleUrls: ['./move-next-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveNextButtonComponent {
    constructor(
        public navigable: Navigable
    ) {

    }
}
