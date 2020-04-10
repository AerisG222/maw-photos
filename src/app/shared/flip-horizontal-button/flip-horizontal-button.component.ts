import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-flip-horizontal-button',
    templateUrl: './flip-horizontal-button.component.html',
    styleUrls: ['./flip-horizontal-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipHorizontalButtonComponent {
    constructor(
        private store$: Store
    ) { }

    onFlipHorizontal(): void {
        this.store$.dispatch(PhotoStoreActions.flipHorizontalRequest());
    }
}
