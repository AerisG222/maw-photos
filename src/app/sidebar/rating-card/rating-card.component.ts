import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';

import { Ratable } from '@models/store-facades/ratable';

@Component({
    selector: 'app-sidebar-rating-card',
    templateUrl: './rating-card.component.html',
    styleUrls: ['./rating-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingCardComponent  {
    userRating$ = this.ratable.rating$.pipe(
        map(rating => rating.userRating)
    );

    averageRating$ = this.ratable.rating$.pipe(
        map(rating => rating.averageRating)
    );

    constructor(
        public ratable: Ratable
    ) {

    }

    onRate(userRating: number): void {
        this.ratable.rate(userRating);
    }
}
