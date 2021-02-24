import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    Observable,
    BehaviorSubject,
    combineLatest,
    of,
    concat,
} from 'rxjs';
import { map, tap, delay, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import numbro from 'numbro';

import { Category, PhotoCategory } from '@models';
import { PhotoCategoryStoreSelectors } from '@core/root-store';
import { FormattedStatDetail, StatDetail } from '../../models';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { StatYearSummary } from 'src/app/models/stat-year-summary';

@Component({
    selector: 'app-stats-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoStatsComponent implements OnInit {
    form: FormGroup;
    chartValueFormat = 'count';
    chartData$: Observable<StatDetail[]> | null = null;
    selectedYear$ = new BehaviorSubject<number>(-1);
    totalDetails$: Observable<FormattedStatDetail[]> | null = null;
    yearDetails$: Observable<FormattedStatDetail[]> | null = null;

    constructor(private formBuilder: FormBuilder, private store: Store) {
        this.form = this.formBuilder.group({
            aggregateBy: ['count'],
        });

        this.chartData$ = combineLatest([
            this.store.select(PhotoCategoryStoreSelectors.totalStats),
            this.form.get('aggregateBy')?.valueChanges as Observable<any>
        ]).pipe(
            map(([stats, aggregateBy]) => {
                if(aggregateBy === 'count') {
                    return getCountStatDetails(stats.statsByYear.values);
                } else {
                    return getSizeStatDetails(stats.statsByYear.values);
                }
            })
        )
    }

    ngOnInit(): void {
        const years$ = this.store.select(PhotoCategoryStoreSelectors.allYears);
        const categories$ = this.store.select(
            PhotoCategoryStoreSelectors.allCategories
        );

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
            filter((x) => !!x[0]),
            map((x) => this.prepareChartData(x[0], x[1], x[2], x[3]))
        );

        this.totalDetails$ = combineLatest([years$, categories$]).pipe(
            filter((x) => !!x[0]),
            map((x) => this.prepareTotalDetails(x[0], x[1]))
        );

        this.yearDetails$ = combineLatest([
            categories$,
            this.selectedYear$,
        ]).pipe(map((x) => this.prepareYearDetails(x[0], x[1])));
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
            name: 'Photos',
            value: numbro(
                categories.reduce(
                    (total, cat) =>
                        total + (cat.actual as PhotoCategory).photoCount,
                    0
                )
            ).format({ thousandSeparated: true }),
        });

        details.push({
            name: 'Total Size',
            value: numbro(
                categories.reduce(
                    (total, cat) =>
                        total + (cat.actual as PhotoCategory).totalSize,
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

        if (aggregateBy === 'count') {
            agg = getPhotoCount;
        } else {
            agg = getPhotoSize;
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

const getPhotoCount = (category: Category): number => {
    return (category.actual as PhotoCategory).photoCount;
};

const getPhotoSize = (category: Category): number => {
    return (category.actual as PhotoCategory).totalSize;
};

const getCountStatDetails = (stats: IterableIterator<StatYearSummary>): StatDetail[] => {
    return Array.from(
        stats,
        (x => ({
            name: x.year.toString(),
            value: x.itemCount
        }))
    );
}

const getSizeStatDetails = (stats: IterableIterator<StatYearSummary>): StatDetail[] => {
    return Array.from(
        stats,
        (x => ({
            name: x.year.toString(),
            value: x.size
        }))
    );
}
