import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions } from '@core/root-store';

@Component({
    selector: 'app-photos-toolbar-flip-vertical-button',
    templateUrl: './toolbar-flip-vertical-button.component.html',
    styleUrls: ['./toolbar-flip-vertical-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarFlipVerticalButtonComponent {
    constructor(private store: Store) {}

    onFlipVertical(): void {
        this.store.dispatch(PhotoStoreActions.flipVerticalRequest());
    }
}
