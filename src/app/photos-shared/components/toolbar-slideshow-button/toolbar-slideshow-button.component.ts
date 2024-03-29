import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-photos-toolbar-slideshow-button',
    templateUrl: './toolbar-slideshow-button.component.html',
    styleUrls: ['./toolbar-slideshow-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarSlideshowButtonComponent {
    slideshowPlaying$ = this.store.select(
        PhotoStoreSelectors.selectSlideshowIsPlaying
    );

    constructor(private store: Store) {}

    onToggleSlideshow(): void {
        this.store.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }
}
