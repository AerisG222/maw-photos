import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, map, take, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { RootStoreState, PhotoCategoryStoreSelectors, PhotoCategoryStoreActions } from 'src/app/core/root-store';

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
        private _store$: Store<RootStoreState.State>,
        private _route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        const categories$ = this._store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectAllCategories),
                take(1)
            );

        this.activeYear$ = this._route.params
            .pipe(
                map(x => Number(x['id'])),
                take(1)
            );

        this.chartData$ = forkJoin(
                categories$,
                this.activeYear$
            )
            .pipe(
                delay(0),
                map(x => x[0].filter(cat => cat.year === x[1])),
                tap(categories => this.updateYearTotals(categories)),
                map(categories => categories.map(cat => ({
                    'name': cat.name,
                    'value': cat.photoCount
                })))
            );

        categories$.subscribe();

        this._store$.dispatch(new PhotoCategoryStoreActions.LoadRequestAction());
    }

    updateYearTotals(categories: PhotoCategory[]): void {
        this.categoryCount = categories.length;

        this.photoCount = categories
            .reduce((total, cat) => total + cat.photoCount, 0);
    }
}
