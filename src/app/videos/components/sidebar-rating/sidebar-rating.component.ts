import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { Rating } from 'src/app/models/rating.model';
import { VideoStoreSelectors, VideoStoreActions } from '../../store';

@Component({
    selector: 'app-videos-sidebar-rating',
    templateUrl: './sidebar-rating.component.html',
    styleUrls: ['./sidebar-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarRatingComponent implements OnInit, OnDestroy {
    private currentId = -1;
    private destroySub = new Subscription();

    rating$: Observable<Rating>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.rating$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoRating),
                filter(rating => !!rating)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideo),
                filter(video => !!video),
                tap(video => this.currentId = video.id),
                tap(video => this.store$.dispatch(VideoStoreActions.loadRatingRequest({ videoId: video.id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onRate(userRating: number): void {
        if (this.currentId !== -1) {
            this.store$.dispatch(VideoStoreActions.rateVideoRequest({ videoId: this.currentId, userRating }));
        }
    }
}
