import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { RootStoreState } from 'src/app/core/root-store';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store/photo-store';

@Component({
    selector: 'app-slideshow-button',
    templateUrl: './slideshow-button.component.html',
    styleUrls: ['./slideshow-button.component.scss']
})
export class SlideshowButtonComponent implements OnInit {
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
        this._store$.dispatch(new PhotoStoreActions.ToggleSlideshowRequestAction());
    }
}
