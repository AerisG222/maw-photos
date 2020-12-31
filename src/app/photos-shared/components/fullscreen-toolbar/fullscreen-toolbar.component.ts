import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';

@Component({
    selector: 'app-photos-fullscreen-toolbar',
    templateUrl: './fullscreen-toolbar.component.html',
    styleUrls: ['./fullscreen-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenToolbarComponent {
    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);

    constructor(
        private store: Store
    ) { }

    onExitFullscreen(): void {
        this.store.dispatch(PhotoStoreActions.exitFullscreenRequest());
    }

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
