import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, map, take, delay } from 'rxjs/operators';

import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';
import { CategoryStats } from 'src/app/core/models/category-stats.model';

@Component({
    selector: 'app-year-stats',
    templateUrl: './year-stats.component.html',
    styleUrls: ['./year-stats.component.css']
})
export class YearStatsComponent implements OnInit {
    activeYear$: Observable<number>;
    chartData$: Observable<any>;

    categoryCount: number;
    photoCount: number;

    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        const yearStats$ = this._api.getPhotoStats()
            .pipe(
                take(1)
            );

        this.activeYear$ = this._route.params
            .pipe(
                map(x => Number(x['id'])),
                take(1)
            );

        this.chartData$ = forkJoin(
                yearStats$,
                this.activeYear$
            )
            .pipe(
                delay(0),
                map(x => x[0].filter(yearStat => yearStat.year === x[1])[0]),
                tap(yearStat => this.updateYearTotals(yearStat.categoryStats)),
                map(yearStat => yearStat.categoryStats.map(catStat => ({
                    'name': catStat.name,
                    'value': catStat.photoCount
                })))
            );

        yearStats$.subscribe();
    }

    updateYearTotals(categoryStats: CategoryStats[]): void {
        this.categoryCount = categoryStats.length;

        this.photoCount = categoryStats
            .reduce((total, cat) => total + cat.photoCount, 0);
    }
}
