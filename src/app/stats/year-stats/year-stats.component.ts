import { Component, OnInit, Inject } from '@angular/core';
import { photoApiServiceToken, PhotoApiService } from 'src/app/core/services/photo-api.service';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { CategoryStats } from 'src/app/core/models/category-stats.model';

@Component({
    selector: 'app-year-stats',
    templateUrl: './year-stats.component.html',
    styleUrls: ['./year-stats.component.css']
})
export class YearStatsComponent implements OnInit {
    activeYear: number;
    chartData$: Observable<any>;

    countCategoriesInYear: number;
    countPhotosInYear: number;

    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _route: ActivatedRoute,
    ) {

    }


    ngOnInit() {
        this.chartData$ = forkJoin(
                this._api.getPhotoStats(),
                this._route.params
            )
            .pipe(
                tap(x => this.activeYear = x[1]['id']),
                map(x => x[0].filter(yearStat => yearStat.year === this.activeYear)[0]),
                tap(yearStat => this.updateYearTotals(yearStat.categoryStats)),
                map(yearStat => yearStat.categoryStats.map(catStat => ({
                    'name': catStat.name,
                    'value': catStat.photoCount
                })))
            );
        /*
        this.chartData$.next(
            this._stats
                .map(x => ({
                    'name': x.year.toString(),
                    'value': x.categoryStats
                        .map(c => c.photoCount)
                        .reduce((total, count) => count + total)
                }))
        );
        */
    }

    /*
    showYearDetails(year: number): void {
        const categoryStats = this._stats
            .filter(x => x.year === year)[0].categoryStats;

        this.updateYearTotals(categoryStats);

        this.chartData$.next(
            categoryStats
                .map(x => ({
                    'name': x.name,
                    'value': x.photoCount
                }))
        );
    }
    */

    updateYearTotals(categoryStats: CategoryStats[]): void {
        this.countCategoriesInYear = categoryStats.length;

        this.countPhotosInYear = categoryStats
            .reduce((total, cat) => total + cat.photoCount, 0);
    }
}
