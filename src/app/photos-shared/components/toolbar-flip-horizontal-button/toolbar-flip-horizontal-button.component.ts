import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';

@Component({
    selector: 'app-photos-toolbar-flip-horizontal-button',
    templateUrl: './toolbar-flip-horizontal-button.component.html',
    styleUrls: ['./toolbar-flip-horizontal-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarFlipHorizontalButtonComponent {
    constructor(private store: Store) {}

    onFlipHorizontal(): void {
        this.store.dispatch(PhotoStoreActions.flipHorizontalRequest());
    }
}
