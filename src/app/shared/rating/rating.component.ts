import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Rating } from 'src/app/core/models/rating.model';
import { RatingMode } from './rating-mode.model';
import { RootStoreState, PhotoStoreActions, VideoStoreActions, PhotoStoreSelectors, VideoStoreSelectors } from 'src/app/core/root-store';
import { filter, tap } from 'rxjs/operators';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit, OnDestroy {
    @Input() mode: RatingMode;

    private currentId = -1;
    private destroySub = new Subscription();
    rating$: Observable<Rating>;

    constructor(
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit(): void {
        switch (this.mode) {
            case RatingMode.Photos:
                this.initPhotoRating();
                break;
            case RatingMode.Videos:
                this.initVideoRating();
                break;
            default:
                throw new Error('invalid rating mode!');
        }
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    initPhotoRating(): void {
        this.rating$ = this.store$.pipe(
            select(PhotoStoreSelectors.selectCurrentPhotoRating)
        );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(photo => !!photo),
                tap(photo => this.currentId = photo.id),
                tap(photo => this.store$.dispatch(PhotoStoreActions.loadRatingRequest({ photoId: photo.id })))
            ).subscribe()
        );
    }

    initVideoRating(): void {
        this.rating$ = this.store$.pipe(
            select(VideoStoreSelectors.selectCurrentVideoRating)
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

    onRate(userRating: number): void {
        if (this.currentId === -1) {
            return;
        }

        if (this.mode === RatingMode.Photos) {
            this.store$.dispatch(PhotoStoreActions.ratePhotoRequest({ photoId: this.currentId, userRating }));
        }

        if (this.mode === RatingMode.Videos) {
            this.store$.dispatch(VideoStoreActions.rateVideoRequest({ videoId: this.currentId, userRating }));
        }
    }
}
