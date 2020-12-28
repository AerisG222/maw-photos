import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-toolbar-slideshow-button',
    templateUrl: './toolbar-slideshow-button.component.html',
    styleUrls: ['./toolbar-slideshow-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSlideshowButtonComponent {
    @Output() toggleSlideshow = new EventEmitter<void>();

    slideshowPlaying$ = this.store.select(PhotoStoreSelectors.slideshowIsPlaying);

    constructor(
        private store: Store
    ) { }

    onToggleSlideshow(): void {
        this.toggleSlideshow.emit();
    }
}
