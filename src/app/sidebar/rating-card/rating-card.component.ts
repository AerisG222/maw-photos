// eslint-disable-next-line max-len
import { Component, Input, ChangeDetectionStrategy, ViewChild, AfterViewInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { NgxStarsComponent } from 'ngx-stars';

import { Rating } from 'src/app/models/rating.model';

@Component({
    selector: 'app-sidebar-rating-card',
    templateUrl: './rating-card.component.html',
    styleUrls: ['./rating-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingCardComponent implements AfterViewInit {
    @Input()
    set rating(value: Rating | null) {
        this.theRating = value;
        this.updateRating();
    }
    get rating(): Rating | null { return this.theRating; }

    @Output() rate = new EventEmitter<number>();

    @ViewChild('userRating') userRatingComponent: NgxStarsComponent | null = null;
    @ViewChild('averageRating') averageRatingComponent: NgxStarsComponent | null = null;

    private isReady = false;
    private theRating: Rating | null = null;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {

    }

    ngAfterViewInit(): void {
        this.isReady = true;

        this.updateRating();
    }

    onRate(userRating: number): void {
        this.rate.next(userRating);
    }

    private updateRating(): void {
        if (!!this.theRating && this.isReady) {
            this.userRatingComponent?.setRating(this.theRating.userRating);
            this.averageRatingComponent?.setRating(this.theRating.averageRating);

            this.changeDetectorRef.detectChanges();
        }
    }
}
