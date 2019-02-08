import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState } from 'src/app/core/root-store';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photo-store';
import { LayoutStoreActions } from 'src/app/core/root-store/layout-store';

@Component({
    selector: 'app-photo-list-fullscreen-toolbar',
    templateUrl: './photo-list-fullscreen-toolbar.component.html',
    styleUrls: ['./photo-list-fullscreen-toolbar.component.scss']
})
export class PhotoListFullscreenToolbarComponent implements OnInit {
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

    onExitFullscreen(): void {
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this._store$.dispatch(new PhotoStoreActions.ExitFullscreenRequestAction());
    }

    onToggleSlideshow(): void {
        this._store$.dispatch(new PhotoStoreActions.ToggleSlideshowRequestAction());
    }
}