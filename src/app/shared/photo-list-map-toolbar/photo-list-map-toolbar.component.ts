import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store';

// TODO: do not allow moving past end of map list with arrow keys

@Component({
    selector: 'app-photo-list-map-toolbar',
    templateUrl: './photo-list-map-toolbar.component.html',
    styleUrls: ['./photo-list-map-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListMapToolbarComponent implements OnInit {
    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;

    private isFirst: boolean;
    private isLast: boolean;

    constructor(
        private store$: Store<{}>
    ) { }

    ngOnInit() {
        this.isFirst$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirstWithGpsCoordinates),
                tap(isFirst => this.isFirst = isFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLastWithGpsCoordinates),
                tap(isLast => this.isLast = isLast)
            );
    }

    onToggleMapView(): void {
        this.store$.dispatch(PhotoStoreActions.toggleMapViewRequest());
    }

    onMoveNext(): void {
        if (!this.isLast) {
            this.store$.dispatch(PhotoStoreActions.moveNextWithGpsRequest());
        }
    }

    onMovePrevious(): void {
        if (!this.isFirst) {
            this.store$.dispatch(PhotoStoreActions.movePreviousWithGpsRequest());
        }
    }
}
