import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoStoreSelectors, RootStoreState } from 'src/app/core/root-store';
import { MatButton } from '@angular/material/button';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-slideshow-button',
    templateUrl: './slideshow-button.component.html',
    styleUrls: ['./slideshow-button.component.scss']
})
export class SlideshowButtonComponent implements OnInit, CanRipple {
    @Output() toggleSlideshow = new EventEmitter<void>();

    @ViewChild('slideshowButton', {static: false}) slideshowButton: MatButton;

    slideshowPlaying$: Observable<boolean>;

    constructor(
        private store$: Store<RootStoreState.State>
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

    triggerRipple(): void {
        if (!this.slideshowButton.disabled) {
            this.slideshowButton.ripple.launch({ centered: true });
        }
    }
}
