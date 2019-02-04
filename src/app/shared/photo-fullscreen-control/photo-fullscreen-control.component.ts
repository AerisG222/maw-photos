import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootStoreState } from 'src/app/core/root-store';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photo-store';
import { LayoutStoreActions } from 'src/app/core/root-store/layout-store';

@Component({
    selector: 'app-photo-fullscreen-control',
    templateUrl: './photo-fullscreen-control.component.html',
    styleUrls: ['./photo-fullscreen-control.component.scss']
})
export class PhotoFullscreenControlComponent implements OnInit {
    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;
    slideshowPlaying$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.isFirst$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );

        this.isLast$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );

        this.slideshowPlaying$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying)
            );
    }

    onMoveNext(): void {
        this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
    }

    onMovePrevious(): void {
        this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
    }

    onExitFullscreen(): void {
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this._store$.dispatch(new PhotoStoreActions.ExitFullscreenRequestAction());
    }

    onToggleSlideshow(): void {
        this._store$.dispatch(new PhotoStoreActions.ToggleSlideshowRequestAction());
    }
}
