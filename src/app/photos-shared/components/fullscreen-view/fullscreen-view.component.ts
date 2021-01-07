import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LayoutStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-photos-fullscreen-view',
    templateUrl: './fullscreen-view.component.html',
    styleUrls: ['./fullscreen-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenViewComponent implements OnDestroy {
    constructor(
        private store: Store,
    ) { }

    ngOnDestroy(): void {
        this.store.dispatch(LayoutStoreActions.exitFullscreenRequest());
    }
}
