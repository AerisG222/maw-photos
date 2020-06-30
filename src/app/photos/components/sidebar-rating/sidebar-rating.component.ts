import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

import { Rating } from 'src/app/models/rating.model';
import { PhotoStoreSelectors, PhotoStoreActions } from '../../store';
import { Photo } from 'src/app/models/photo.model';

@Component({
    selector: 'app-photos-sidebar-rating',
    templateUrl: './sidebar-rating.component.html',
    styleUrls: ['./sidebar-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarRatingComponent implements OnInit, OnDestroy {
    private currentId = -1;
    private destroySub = new Subscription();

    rating$?: Observable<Rating | undefined>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.rating$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoRating)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                map(photo => photo as Photo),
                tap(photo => this.currentId = photo.id),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadRatingRequest({ photoId: photo.id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onRate(userRating: number): void {
        if (this.currentId !== -1) {
            this.store$.dispatch(PhotoStoreActions.ratePhotoRequest({ photoId: this.currentId, userRating }));
        }
    }
}
