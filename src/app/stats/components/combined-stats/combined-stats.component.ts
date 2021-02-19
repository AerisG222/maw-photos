import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
    Subscription,
    BehaviorSubject,
    Observable,
    combineLatest,
    concat,
    of,
} from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import numbro from 'numbro';

import { FormattedStatDetail } from 'src/app/stats/models/formatted-stat-detail.model';
import { StatDetail } from 'src/app/stats/models/stat-detail.model';
import { RootStoreSelectors } from '@core/root-store';
import { Category, CategoryType, PhotoCategory, VideoCategory } from '@models';

@Component({
    selector: 'app-stats-combined-stats',
    templateUrl: './combined-stats.component.html',
    styleUrls: ['./combined-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedStatsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    chartData$: Observable<StatDetail[]> | null = null;
    chartValueFormat = 'count';
    selectedYear$ = new BehaviorSubject<number>(-1);
    totalDetails$: Observable<FormattedStatDetail[]> | null = null;
    yearDetails$: Observable<FormattedStatDetail[]> | null = null;

    private destroySub = new Subscription();

    constructor(private formBuilder: FormBuilder, private store: Store) {
        this.form = this.formBuilder.group({
            aggregateBy: ['count'],
        });
    }

    ngOnInit(): void {
        const years$ = this.store.select(RootStoreSelectors.allYears);
        const categories$ = this.store.select(RootStoreSelectors.allCategories);

        const aggregateBy$ = concat(
            of('count'),
            this.form.get('aggregateBy')?.valueChanges as Observable<string>
        );

        this.chartData$ = combineLatest([
            years$,
            categories$,
            this.selectedYear$,
            aggregateBy$,
        ]).pipe(
            tap((x) => (this.chartValueFormat = x[3])),
            delay(2),
            map((x) => this.prepareChartData(x[0], x[1], x[2], x[3]))
        );

        this.totalDetails$ = combineLatest([years$, categories$]).pipe(
            map((x) => this.prepareTotalDetails(x[0], x[1]))
        );

        this.yearDetails$ = combineLatest([
            categories$,
            this.selectedYear$,
        ]).pipe(map((x) => this.prepareYearDetails(x[0], x[1])));

        this.destroySub.add(aggregateBy$.subscribe());
        this.destroySub.add(years$.subscribe());
        this.destroySub.add(categories$.subscribe());
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSelectYear(evt: StatDetail): void {
        const year = Number(evt.name);

        if (year > 0) {
            this.selectedYear$.next(year);
        }
    }

    onRemoveYearFilter(): void {
        this.selectedYear$.next(-1);
    }

    private prepareTotalDetails(
        years: number[],
        categories: Category[]
    ): FormattedStatDetail[] {
        const details: FormattedStatDetail[] = [];

        details.push({
            name: 'Years',
            value: years.length.toString(),
        });

        this.populateDetails(categories, details);

        return details;
    }

    private prepareYearDetails(
        categories: Category[],
        selectedYear: number
    ): FormattedStatDetail[] {
        const details: FormattedStatDetail[] = [];

        categories = categories.filter((x) => x.year === selectedYear);

        this.populateDetails(categories, details);

        return details;
    }

    private populateDetails(
        categories: Category[],
        details: FormattedStatDetail[]
    ): void {
        details.push({
            name: 'Categories',
            value: numbro(categories.length).format({
                thousandSeparated: true,
            }),
        });

        details.push({
            name: 'Items',
            value: numbro(
                categories.reduce((total, cat) => total + getCount(cat), 0)
            ).format({ thousandSeparated: true }),
        });

        details.push({
            name: 'Total Size',
            value: numbro(
                categories.reduce(
                    (total, cat) => total + cat.actual.totalSize,
                    0
                )
            ).format({
                output: 'byte',
                base: 'decimal',
                mantissa: 2,
                spaceSeparated: true,
            }),
        });
    }

    private prepareChartData(
        years: number[],
        categories: Category[],
        selectedYear: number,
        aggregateBy: string
    ): { name: string; value: number }[] {
        let agg: (category: Category) => number;

        switch (aggregateBy) {
            case 'count':
                agg = getCount;
                break;
            case 'size':
                agg = getSize;
                break;
        }

        if (selectedYear !== -1) {
            return categories
                .filter((cat) => cat.year === selectedYear)
                .map((cat) => ({
                    name: cat.name,
                    value: agg(cat),
                }));
        }

        return years.map((year) => ({
            name: year.toString(),
            value: categories
                .filter((cat) => cat.year === year)
                .reduce((total, cat) => total + agg(cat), 0),
        }));
    }
}

const getCount = (category: Category): number => {
    return category.type === CategoryType.photo
        ? (category.actual as PhotoCategory).photoCount
        : (category.actual as VideoCategory).videoCount;
};

const getSize = (category: Category): number => {
    return category.actual.totalSize;
};
