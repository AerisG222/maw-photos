import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-photos-fullscreen-toolbar',
    templateUrl: './fullscreen-toolbar.component.html',
    styleUrls: ['./fullscreen-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenToolbarComponent {
    isFirst$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoLast);

    constructor(private store: Store) {}

    onMoveNext(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onMovePrevious(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onToggleSlideshow(): void {
        this.store.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }
}
