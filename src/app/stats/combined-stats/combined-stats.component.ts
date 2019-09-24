import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as numeral from 'numeral';

import { StatDetail } from '../models/stat-detail.model';
import { RootStoreState, RootStoreSelectors } from 'src/app/core/root-store';
import { VideoCategory } from 'src/app/core/models/video-category.model';
import { Category } from 'src/app/core/models/category.model';
import { CategoryType } from 'src/app/core/models/category-type.model';
import { PhotoCategory } from 'src/app/core/models/photo-category.model';

@Component({
  selector: 'app-combined-stats',
  templateUrl: './combined-stats.component.html',
  styleUrls: ['./combined-stats.component.scss']
})
export class CombinedStatsComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    form: FormGroup;
    aggregateBy$ = new BehaviorSubject<string>('count');
    chartData$: Observable<any>;
    chartValueFormat = 'count';
    selectedYear$ = new BehaviorSubject<number>(null);
    totalDetails$: Observable<StatDetail[]>;
    yearDetails$: Observable<StatDetail[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            aggregateBy: ['count']
        });

        const years$ = this.store$
            .pipe(
                select(RootStoreSelectors.selectAllYears)
            );

        const categories$ = this.store$
            .pipe(
                select(RootStoreSelectors.selectAllCategories)
            );

        this.destroySub.add(this.form.get('aggregateBy').valueChanges
            .pipe(
                tap(val => this.aggregateBy$.next(val)),
                tap(val => this.chartValueFormat = val)
            )
            .subscribe()
        );

        this.chartData$ = combineLatest([
                years$,
                categories$,
                this.selectedYear$,
                this.aggregateBy$
            ])
            .pipe(
                map(x => this.prepareChartData(x[0], x[1], x[2], x[3]))
            );

        this.totalDetails$ = combineLatest([
                years$,
                categories$,
            ])
            .pipe(
                map(x => this.prepareTotalDetails(x[0], x[1]))
            );

        this.yearDetails$ = combineLatest([
                categories$,
                this.selectedYear$
            ])
            .pipe(
                map(x => this.prepareYearDetails(x[0], x[1]))
            );

        this.destroySub.add(years$.subscribe());
        this.destroySub.add(categories$.subscribe());
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSelectYear(evt): void {
        const year = Number(evt.name);

        if (year > 0) {
            this.selectedYear$.next(year);
        }
    }

    onRemoveYearFilter(): void {
        this.selectedYear$.next(null);
    }

    private prepareTotalDetails(years: number[], categories: Category[]): StatDetail[] {
        const details: StatDetail[] = [];

        details.push({
            name: 'Years',
            value: years.length.toString()
        });

        this.populateDetails(categories, details);

        return details;
    }

    private prepareYearDetails(categories: Category[], selectedYear: number): StatDetail[] {
        const details: StatDetail[] = [];

        categories = categories.filter(x => x.year === selectedYear);

        this.populateDetails(categories, details);

        return details;
    }

    private populateDetails(categories: Category[], details: StatDetail[]): void {
        details.push({
            name: 'Categories',
            value: numeral(categories.length).format('0,0')
        });

        details.push({
            name: 'Items',
            value: numeral(categories
                    .reduce((total, cat) => total + this.getCount(cat), 0)
                ).format('0,0')
        });

        details.push({
            name: 'Total Size',
            value: numeral(categories
                .reduce((total, cat) => total + cat.actual.totalSize, 0)).format('0,0.00 b')
        });
    }

    private prepareChartData(years: number[], categories: Category[], selectedYear: number, aggregateBy: string) {
        let agg = null;

        switch (aggregateBy) {
            case 'count':
                agg = this.getCount;
                break;
            case 'size':
                agg = this.getSize;
                break;
        }

        if (selectedYear !== null) {
            return categories
                .filter(cat => cat.year === selectedYear)
                .map(cat => ({
                        name: cat.name,
                        value: agg(cat)
                    })
                );
        }

        return years
            .map(year => ({
                name: year.toString(),
                value:  categories
                    .filter(cat => cat.year === year)
                    .reduce((total, cat) => total + agg(cat), 0)
            }));
    }

    private getCount(category: Category): number {
        return category.type === CategoryType.photo ?
            (category.actual as PhotoCategory).photoCount :
            (category.actual as VideoCategory).videoCount;
    }

    private getSize(category: Category): number {
        return category.actual.totalSize;
    }
}
