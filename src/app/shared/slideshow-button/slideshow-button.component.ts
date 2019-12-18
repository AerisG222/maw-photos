import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { PhotoStoreSelectors } from 'src/app/core/root-store';
import { MatButton } from '@angular/material/button';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-slideshow-button',
    templateUrl: './slideshow-button.component.html',
    styleUrls: ['./slideshow-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowButtonComponent implements OnInit, CanRipple {
    @Output() toggleSlideshow = new EventEmitter<void>();

    @ViewChild('slideshowButton') slideshowButton: MatButton;

    slideshowPlaying$: Observable<boolean>;

    constructor(
        private store$: Store<{}>
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
