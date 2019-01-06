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

    colorScheme = colorSets.find(s => s.name === 'cool');
    chartData$ = new BehaviorSubject<any>(null);

    constructor(@Inject(PHOTO_API_SERVICE) private _api: IPhotoApiService) {

    }

    ngOnInit() {
        this._api
            .getPhotoStats()
            .subscribe(x => {
                this._stats = x;
                this.showYearsOverview();
            });
    }

    onSelect(evt): void {
        console.log(evt);
    }

    showYearsOverview(): void {
        this.chartData$.next(
            this._stats
                .map(x => ({
                    'name': x.year,
                    'value': x.categoryStats
                        .map(c => c.photoCount)
                        .reduce((total, count) => count + total)
                }))
        );
    }

    showYearDetails(year: number): void {
        this.chartData$.next(
            this._stats
                .filter(x => x.year === year)[0].categoryStats
                .map(x => ({
                    'name': x.name,
                    'value': x.photoCount
                }))
        );
    }
}
