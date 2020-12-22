import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
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
    rating$: Observable<Rating | null> | null = null;

    private activeId = -1;
    private destroySub = new Subscription();

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.rating$ = this.store.select(PhotoStoreSelectors.activePhotoRating);

        this.destroySub.add(this.store
            .select(PhotoStoreSelectors.activePhoto)
            .pipe(
                filter(photo => !!photo),
                map(photo => photo as Photo),
                tap(photo => this.activeId = photo.id),
                tap(photo => this.store.dispatch(PhotoStoreActions.loadRatingRequest({ photoId: photo.id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onRate(userRating: number): void {
        if (this.activeId !== -1) {
            this.store.dispatch(PhotoStoreActions.ratePhotoRequest({ photoId: this.activeId, userRating }));
        }
    }
}
