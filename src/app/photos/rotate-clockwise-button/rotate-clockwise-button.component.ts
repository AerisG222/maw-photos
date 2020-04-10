import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/photos/store';

@Component({
  selector: 'app-rotate-clockwise-button',
  templateUrl: './rotate-clockwise-button.component.html',
  styleUrls: ['./rotate-clockwise-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotateClockwiseButtonComponent {
    constructor(
        private store$: Store
    ) { }

    onRotateClockwise(): void {
        this.store$.dispatch(PhotoStoreActions.rotateClockwiseRequest());
    }
}
