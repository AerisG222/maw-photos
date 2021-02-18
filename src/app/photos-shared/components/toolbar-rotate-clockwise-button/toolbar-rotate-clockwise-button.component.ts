import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';

@Component({
    selector: 'app-photos-toolbar-rotate-clockwise-button',
    templateUrl: './toolbar-rotate-clockwise-button.component.html',
    styleUrls: ['./toolbar-rotate-clockwise-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarRotateClockwiseButtonComponent {
    constructor(private store: Store) {}

    onRotateClockwise(): void {
        this.store.dispatch(PhotoStoreActions.rotateClockwiseRequest());
    }
}
