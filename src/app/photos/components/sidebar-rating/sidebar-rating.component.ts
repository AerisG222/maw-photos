import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { PhotoStoreSelectors, PhotoStoreActions } from '../../store';

@Component({
    selector: 'app-photos-sidebar-rating',
    templateUrl: './sidebar-rating.component.html',
    styleUrls: ['./sidebar-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarRatingComponent {
    rating$ = this.store.select(PhotoStoreSelectors.activePhotoRating);

    constructor(
        private store: Store
    ) {

    }

    onRate(userRating: number): void {
        this.store.select(PhotoStoreSelectors.activePhotoId)
            .pipe(
                first()
            ).subscribe({
                next: id => this.store.dispatch(PhotoStoreActions.ratePhotoRequest({ photoId: id as number, userRating })),
                error: err => console.log(`error trying to add rating: ${ err }`)
            });
    }
}
