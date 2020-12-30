import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { Rating } from 'src/app/models/rating.model';
import { VideoStoreSelectors, VideoStoreActions } from '../../store';

@Component({
    selector: 'app-videos-sidebar-rating',
    templateUrl: './sidebar-rating.component.html',
    styleUrls: ['./sidebar-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarRatingComponent implements OnInit {
    rating$: Observable<Rating | null> | null = null;

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
    }

    onRate(userRating: number): void {
        this.store.select(VideoStoreSelectors.activeVideoId)
            .pipe(
                first()
            ).subscribe({
                next: id => {
                    if(!!id) {
                        this.store.dispatch(VideoStoreActions.rateVideoRequest({ videoId: id as number, userRating }));
                    }
                },
                error: err => console.log(`error trying to add rating: ${ err }`)
            });
    }
}
