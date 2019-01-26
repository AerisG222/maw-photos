import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';

import { photoApiServiceToken, PhotoApiService } from '../../core/services/photo-api.service';
import { YearStats } from 'src/app/core/models/year-stats.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss']
})
export class PhotoStatsComponent implements OnInit {
    chartData$: Observable<any>;

    yearCount: number;
    categoryCount: number;
    photoCount: number;

    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _router: Router
    ) {

    }

    ngOnInit() {
        this.chartData$ = this._api
            .getPhotoStats()
            .pipe(
                delay(0),
                tap(stats => this.updateTotals(stats)),
                map(stats => stats.map(yearStat => ({
                    'name': yearStat.year.toString(),
                    'value': yearStat.categoryStats
                        .map(c => c.photoCount)
                        .reduce((total, count) => count + total)
                })))
            );
    }

    onSelect(evt): void {
        const yr = Number(evt.name);

        if (yr > 0) {
            this._router.navigate(['stats', 'year', yr]);
        }
    }

    private updateTotals(stats: YearStats[]): void {
        this.yearCount = stats.length;

        this.categoryCount = stats
            .reduce((total, yr) => yr.categoryStats.length + total, 0);

        this.photoCount = stats
            .reduce((total, yr) => total + yr.categoryStats
                .reduce((catTotal, cat) => catTotal + cat.photoCount, 0)
                , 0);
    }
}
