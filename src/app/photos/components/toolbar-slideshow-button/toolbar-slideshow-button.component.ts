import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoStoreSelectors } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-toolbar-slideshow-button',
    templateUrl: './toolbar-slideshow-button.component.html',
    styleUrls: ['./toolbar-slideshow-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSlideshowButtonComponent implements OnInit {
    @Output() toggleSlideshow = new EventEmitter<void>();

    slideshowPlaying$?: Observable<boolean>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit(): void {
        this.slideshowPlaying$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying)
            );
    }

    onToggleSlideshow(): void {
        this.toggleSlideshow.emit();
    }
}
