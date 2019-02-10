import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoStoreSelectors, RootStoreState } from 'src/app/core/root-store';

@Component({
    selector: 'app-slideshow-button',
    templateUrl: './slideshow-button.component.html',
    styleUrls: ['./slideshow-button.component.scss']
})
export class SlideshowButtonComponent implements OnInit {
    @Output() toggleSlideshow = new EventEmitter<void>();

    slideshowPlaying$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.slideshowPlaying$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying)
            );
    }

    onToggleSlideshow(): void {
        this.toggleSlideshow.emit();
    }
}
