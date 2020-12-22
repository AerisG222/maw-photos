import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-fullscreen-toolbar',
    templateUrl: './fullscreen-toolbar.component.html',
    styleUrls: ['./fullscreen-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenToolbarComponent implements OnInit {
    isFirst$: Observable<boolean> | null = null;
    isLast$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) { }

    ngOnInit(): void {
        this.isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
        this.isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);
    }

    onExitFullscreen(): void {
        this.store.dispatch(PhotoStoreActions.exitFullscreenRequest());
    }

    onMoveNext(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onMovePrevious(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onToggleSlideshow(): void {
        this.store.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }
}
