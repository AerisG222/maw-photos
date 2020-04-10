import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoStoreSelectors } from 'src/app/photos/store';

@Component({
    selector: 'app-slideshow-button',
    templateUrl: './slideshow-button.component.html',
    styleUrls: ['./slideshow-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowButtonComponent implements OnInit {
    @Output() toggleSlideshow = new EventEmitter<void>();

    slideshowPlaying$: Observable<boolean>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit() {
        this.slideshowPlaying$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying)
            );
    }

    onToggleSlideshow(): void {
        this.toggleSlideshow.emit();
    }
}
