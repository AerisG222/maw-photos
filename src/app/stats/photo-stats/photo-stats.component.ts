import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { BehaviorSubject } from 'rxjs';
import { colorSets } from '@swimlane/ngx-charts/release/utils';

import { photoApiServiceToken, PhotoApiService } from 'src/app/services/photo-api.service';
import { YearStats } from 'src/app/models/year-stats.model';
import { CategoryStats } from 'src/app/models/category-stats.model';

@Component({
    selector: 'app-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss']
})
export class PhotoStatsComponent implements OnInit {
    private _stats: YearStats[];
    private _isYearView = true;
    private _setViewDimensions = false;

    view: number[];
    colorScheme = colorSets.find(s => s.name === 'cool');
    chartData$ = new BehaviorSubject<any>(null);

    countYearsTotal: number;
    countCategoriesTotal: number;
    countPhotosTotal: number;
    countCategoriesInYear: number;
    countPhotosInYear: number;
    activeYear = -1;

    constructor(
        @Inject(photoApiServiceToken) private _api: PhotoApiService,
        private _elementRef: ElementRef
        ) {

    }

    ngOnInit() {
        this._api
            .getPhotoStats()
            .subscribe(x => {
                this._stats = x;
                this.updateTotals();
                this.showYearsOverview();
            });
    }

    onSelect(evt): void {
        if (!this._isYearView) {
            return;
        }

        const yr = Number(evt.name);

        if (yr > 0) {
            this.showYearDetails(yr);
        }
    }

    showYearsOverview(): void {
        this._isYearView = true;
        this.activeYear = -1;

        this.setDimensions();

        this.chartData$.next(
            this._stats
                .map(x => ({
                    'name': x.year.toString(),
                    'value': x.categoryStats
                        .map(c => c.photoCount)
                        .reduce((total, count) => count + total)
                }))
        );
    }

    showYearDetails(year: number): void {
        this._isYearView = false;
        this.activeYear = year;

        this.setDimensions();

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

    updateTotals(): void {
        this.countYearsTotal = this._stats.length;

        this.countCategoriesTotal = this._stats
            .reduce((total, yr) => yr.categoryStats.length + total, 0);

        this.countPhotosTotal = this._stats
            .reduce((total, yr) => total + yr.categoryStats
                .reduce((catTotal, cat) => catTotal + cat.photoCount, 0)
                , 0);
    }

    updateYearTotals(categoryStats: CategoryStats[]): void {
        this.countCategoriesInYear = categoryStats.length;

        this.countPhotosInYear = categoryStats
            .reduce((total, cat) => total + cat.photoCount, 0);
    }

    setDimensions(): void {
        // do not force dimensions when showing the chart for the first time
        // (allow it to take up as much space as possible)
        if (!this._setViewDimensions) {
            this._setViewDimensions = true;

            return;
        }

        const chart = this._elementRef.nativeElement.querySelector('ngx-charts-tree-map');

        this.view = [ chart.offsetWidth, chart.offsetHeight ];
    }
}
