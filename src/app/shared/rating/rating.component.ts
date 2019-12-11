import { Component, Input, OnDestroy, ChangeDetectionStrategy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { NgxStarsComponent } from 'ngx-stars';

import { Rating } from 'src/app/core/models/rating.model';
import { RatingMode } from './rating-mode.model';
import { RootStoreState, PhotoStoreActions, VideoStoreActions, PhotoStoreSelectors, VideoStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements AfterViewInit, OnDestroy {
    @Input() mode: RatingMode;

    @ViewChild('userRating') userRatingComponent: NgxStarsComponent;
    @ViewChild('averageRating') averageRatingComponent: NgxStarsComponent;

    private currentId = -1;
    private destroySub = new Subscription();

    constructor(
        private store$: Store<RootStoreState.State>,
        private changeDetectorRef: ChangeDetectorRef
    ) {

    }

    ngAfterViewInit(): void {
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
        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoRating),
                filter(rating => !!rating),
                tap(rating => this.updateRating(rating))
            ).subscribe()
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
        this.destroySub.add(this.store$
            .pipe(
                select(VideoStoreSelectors.selectCurrentVideoRating),
                filter(rating => !!rating),
                tap(rating => this.updateRating(rating))
            ).subscribe()
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

    private updateRating(rating: Rating) {
        this.userRatingComponent.setRating(rating.userRating);
        this.averageRatingComponent.setRating(rating.averageRating);

        this.changeDetectorRef.detectChanges();
    }
}
