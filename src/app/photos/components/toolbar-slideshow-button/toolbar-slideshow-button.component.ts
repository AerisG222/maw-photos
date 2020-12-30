import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-toolbar-slideshow-button',
    templateUrl: './toolbar-slideshow-button.component.html',
    styleUrls: ['./toolbar-slideshow-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSlideshowButtonComponent {
    slideshowPlaying$ = this.store.select(PhotoStoreSelectors.slideshowIsPlaying);

    constructor(
        private store: Store
    ) {

    }

    onToggleSlideshow(): void {
        this.store.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }
}
