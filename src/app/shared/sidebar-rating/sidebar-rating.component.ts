// tslint:disable-next-line: max-line-length
import { Component, Input, ChangeDetectionStrategy, ViewChild, AfterViewInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { NgxStarsComponent } from 'ngx-stars';

import { Rating } from 'src/app/models/rating.model';

@Component({
    selector: 'app-rating',
    templateUrl: './sidebar-rating.component.html',
    styleUrls: ['./sidebar-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarRatingComponent implements AfterViewInit {
    private isReady = false;
    private theRating: Rating;

    @Input()
    set rating(value: Rating) {
        this.theRating = value;
        this.updateRating();
    }
    get rating() { return this.theRating; }

    @Output() rate = new EventEmitter<number>();

    @ViewChild('userRating') userRatingComponent: NgxStarsComponent;
    @ViewChild('averageRating') averageRatingComponent: NgxStarsComponent;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {

    }

    ngAfterViewInit() {
        this.isReady = true;

        this.updateRating();
    }

    onRate(userRating: number): void {
        this.rate.next(userRating);
    }

    private updateRating() {
        if (!!this.rating && this.isReady) {
            this.userRatingComponent.setRating(this.theRating.userRating);
            this.averageRatingComponent.setRating(this.theRating.averageRating);

            this.changeDetectorRef.detectChanges();
        }
    }
}
