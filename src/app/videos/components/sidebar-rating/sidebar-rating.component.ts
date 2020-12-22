import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

import { Rating } from 'src/app/models/rating.model';
import { VideoStoreSelectors, VideoStoreActions } from '../../store';
import { Video } from 'src/app/models/video.model';

@Component({
    selector: 'app-videos-sidebar-rating',
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
        this.rating$ = this.store
            .select(VideoStoreSelectors.activeVideoRating)
            .pipe(
                filter(rating => !!rating)
            );

        this.destroySub.add(this.store
            .select(VideoStoreSelectors.activeVideo)
            .pipe(
                filter(video => !!video),
                map(video => video as Video),
                tap(video => this.activeId = video.id),
                tap(video => this.store.dispatch(VideoStoreActions.loadRatingRequest({ videoId: video.id })))
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onRate(userRating: number): void {
        if (this.activeId !== -1) {
            this.store.dispatch(VideoStoreActions.rateVideoRequest({ videoId: this.activeId, userRating }));
        }
    }
}
