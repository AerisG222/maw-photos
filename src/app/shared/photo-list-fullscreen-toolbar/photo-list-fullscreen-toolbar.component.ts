import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
    LayoutStoreActions,
    PhotoStoreActions,
    PhotoStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-list-fullscreen-toolbar',
    templateUrl: './photo-list-fullscreen-toolbar.component.html',
    styleUrls: ['./photo-list-fullscreen-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListFullscreenToolbarComponent implements OnInit {
    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit(): void {
        this.isFirst$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );
    }

    onExitFullscreen(): void {
        this.store$.dispatch(LayoutStoreActions.exitFullscreenRequest());
        this.store$.dispatch(PhotoStoreActions.exitFullscreenRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onMovePrevious(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onToggleSlideshow(): void {
        this.store$.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }
}
