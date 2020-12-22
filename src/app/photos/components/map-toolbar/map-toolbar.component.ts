import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-map-toolbar',
    templateUrl: './map-toolbar.component.html',
    styleUrls: ['./map-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapToolbarComponent implements OnInit {
    isFirst$: Observable<boolean> | null = null;
    isLast$: Observable<boolean> | null = null;

    private isFirst = true;
    private isLast = true;

    constructor(
        private store: Store
    ) { }

    ngOnInit(): void {
        this.isFirst$ = this.store
            .select(PhotoStoreSelectors.selectIsActivePhotoFirst)
            .pipe(
                tap(isFirst => this.isFirst = isFirst)
            );

        this.isLast$ = this.store
            .select(PhotoStoreSelectors.selectIsActivePhotoLast)
            .pipe(
                tap(isLast => this.isLast = isLast)
            );
    }

    onToggleMapView(): void {
        this.store.dispatch(PhotoStoreActions.toggleMapViewRequest());
    }

    onMoveNext(): void {
        if (!this.isLast) {
            this.store.dispatch(PhotoStoreActions.moveNextRequest());
        }
    }

    onMovePrevious(): void {
        if (!this.isFirst) {
            this.store.dispatch(PhotoStoreActions.movePreviousRequest());
        }
    }
}
