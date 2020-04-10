import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/photos/store';

@Component({
  selector: 'app-rotate-counter-clockwise-button',
  templateUrl: './rotate-counter-clockwise-button.component.html',
  styleUrls: ['./rotate-counter-clockwise-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotateCounterClockwiseButtonComponent {
    constructor(
        private store$: Store
    ) { }

    onRotateCounterClockwise(): void {
        this.store$.dispatch(PhotoStoreActions.rotateCounterClockwiseRequest());
    }
}
