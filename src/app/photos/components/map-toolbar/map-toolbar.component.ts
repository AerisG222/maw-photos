import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';

@Component({
    selector: 'app-photos-map-toolbar',
    templateUrl: './map-toolbar.component.html',
    styleUrls: ['./map-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapToolbarComponent {
    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);

    constructor(
        private store: Store
    ) {

    }

    onToggleMapView(): void {
        this.store.dispatch(PhotoStoreActions.toggleMapViewRequest());
    }

    onMoveNext(): void {
        this.store.select(PhotoStoreSelectors.isActivePhotoLast)
            .pipe(
                first()
            ).subscribe({
                next: isLast => {
                    if (!isLast) {
                        this.store.dispatch(PhotoStoreActions.moveNextRequest());
                    }
                }
            });
    }

    onMovePrevious(): void {
        this.store.select(PhotoStoreSelectors.isActivePhotoFirst)
            .pipe(
                first()
            ).subscribe({
                next: isFirst => {
                    if (!isFirst) {
                        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
                    }
                }
            });
    }
}
