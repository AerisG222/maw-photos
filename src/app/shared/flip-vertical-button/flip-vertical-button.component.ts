import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-flip-vertical-button',
    templateUrl: './flip-vertical-button.component.html',
    styleUrls: ['./flip-vertical-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipVerticalButtonComponent {
    constructor(
        private store$: Store
    ) { }

    onFlipVertical(): void {
        this.store$.dispatch(PhotoStoreActions.flipVerticalRequest());
    }
}
