import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from 'src/app/photos/store';

@Component({
  selector: 'app-photos-toolbar-rotate-counter-clockwise-button',
  templateUrl: './toolbar-rotate-counter-clockwise-button.component.html',
  styleUrls: ['./toolbar-rotate-counter-clockwise-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarRotateCounterClockwiseButtonComponent {
    constructor(
        private store$: Store
    ) { }

    onRotateCounterClockwise(): void {
        this.store$.dispatch(PhotoStoreActions.rotateCounterClockwiseRequest());
    }
}
