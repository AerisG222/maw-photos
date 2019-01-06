import { Component, OnInit, Inject } from '@angular/core';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { BehaviorSubject } from 'rxjs';
import { colorSets } from '@swimlane/ngx-charts/release/utils';

import { PHOTO_API_SERVICE, IPhotoApiService } from 'src/app/services/iphoto-api.service';
import { IYearStats } from 'src/app/models/iyear-stats.model';

@Component({
    selector: 'app-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss']
})
export class PhotoStatsComponent implements OnInit {
    private _stats: IYearStats[];
    private _isYearView = true;

    colorScheme = colorSets.find(s => s.name === 'cool');
    chartData$ = new BehaviorSubject<any>(null);

    countYears: number;
    countCategories: number;
    countPhotos: number;

    constructor(@Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService) {

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

        this.chartData$.next(
            this._stats
                .filter(x => x.year === year)[0].categoryStats
                .map(x => ({
                    'name': x.name,
                    'value': x.photoCount
                }))
        );
    }

    updateTotals(): void {
        this.countYears = this._stats.length;

        this.countCategories = this._stats
            .reduce((total, yr) => yr.categoryStats.length + total, 0);

        this.countPhotos = this._stats
            .reduce((total, yr) => total + yr.categoryStats
                .reduce((catTotal, cat) => catTotal + cat.photoCount, 0)
                , 0);
    }
}
