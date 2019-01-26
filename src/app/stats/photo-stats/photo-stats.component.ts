import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { tap, map, delay, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { RootStoreState, PhotoCategoryStoreSelectors, PhotoCategoryStoreActions } from 'src/app/core/root-store';
import { Category } from 'src/app/core/models/category.model';

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
        private _store$: Store<RootStoreState.State>,
        private _router: Router
    ) {

    }

    ngOnInit() {
        const years$ = this._store$
            .pipe(
                delay(0),
                select(PhotoCategoryStoreSelectors.selectAllYears()),
                tap(years => this.updateYearCount(years)),
                take(1)
            );

        const categories$ = this._store$
            .pipe(
                delay(0),
                select(PhotoCategoryStoreSelectors.selectAllCategories),
                tap(categories => this.updateCategoryTotals(categories)),
                take(1)
            );

        this.chartData$ = forkJoin(
                years$,
                categories$
            )
            .pipe(
                delay(0),
                map(x => x[0].map(year => ({
                    'name': year.toString(),
                    'value': x[1]
                        .filter(cat => cat.year === year)
                        .reduce((total, cat) => total + cat.photoCount, 0)
                })))
            );

        years$.subscribe();
        categories$.subscribe();

        this._store$.dispatch(new PhotoCategoryStoreActions.LoadRequestAction());
    }

    onSelect(evt): void {
        const yr = Number(evt.name);

        if (yr > 0) {
            this._router.navigate(['stats', 'year', yr]);
        }
    }

    private updateYearCount(years: number[]): void {
        this.yearCount = years.length;
    }

    private updateCategoryTotals(categories: Category[]): void {
        this.categoryCount = categories.length;

        this.photoCount = categories
            .reduce((total, cat) => total + cat.photoCount, 0);
    }
}
