import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, Subscription, of, concat } from 'rxjs';
import { map, tap, delay, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as numeral from 'numeral';

import { PhotoCategory } from 'src/app/models/photo-category.model';
import { PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { StatDetail } from 'src/app/stats/models/stat-detail.model';
import { Category } from 'src/app/models/category.model';
import { FormattedStatDetail } from '../../models/formatted-stat-detail.model';

@Component({
    selector: 'app-stats-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoStatsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    chartData$: Observable<StatDetail[]> | null = null;
    chartValueFormat = 'count';
    selectedYear$ = new BehaviorSubject<number>(-1);
    totalDetails$: Observable<FormattedStatDetail[]> | null = null;
    yearDetails$: Observable<FormattedStatDetail[]> | null = null;

    private destroySub = new Subscription();

    constructor(
        private formBuilder: FormBuilder,
        private store: Store
    ) {
        this.form = this.formBuilder.group({
            aggregateBy: ['count']
        });
    }

    ngOnInit(): void {
        const years$ = this.store.select(PhotoCategoryStoreSelectors.allYears);
        const categories$ = this.store.select(PhotoCategoryStoreSelectors.allCategories);

        const aggregateBy$ = concat(
                of('count'),
                this.form.get('aggregateBy')?.valueChanges as Observable<string>
            );

        this.chartData$ = combineLatest([
                years$,
                categories$,
                this.selectedYear$,
                aggregateBy$
            ])
            .pipe(
                tap(x => this.chartValueFormat = x[3]),
                delay(2),
                filter(x => !!x[0]),
                map(x => this.prepareChartData(x[0] as number[], x[1], x[2], x[3]))
            );

        this.totalDetails$ = combineLatest([
                years$,
                categories$,
            ])
            .pipe(
                filter(x => !!x[0]),
                map(x => this.prepareTotalDetails(x[0] as number[], x[1]))
            );

        this.yearDetails$ = combineLatest([
                categories$,
                this.selectedYear$
            ])
            .pipe(
                map(x => this.prepareYearDetails(x[0], x[1]))
            );

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

    private prepareTotalDetails(years: number[], categories: Category[]): FormattedStatDetail[] {
        const details: FormattedStatDetail[] = [];

        details.push({
            name: 'Years',
            value: years.length.toString()
        });

        this.populateDetails(categories, details);

        return details;
    }

    private prepareYearDetails(categories: Category[], selectedYear: number): FormattedStatDetail[] {
        const details: FormattedStatDetail[] = [];

        categories = categories.filter(x => x.year === selectedYear);

        this.populateDetails(categories, details);

        return details;
    }

    private populateDetails(categories: Category[], details: FormattedStatDetail[]): void {
        details.push({
            name: 'Categories',
            value: numeral(categories.length).format('0,0')
        });

        details.push({
            name: 'Photos',
            value: numeral(categories
                    .reduce((total, cat) => total + (cat.actual as PhotoCategory).photoCount, 0)
                ).format('0,0')
        });

        details.push({
            name: 'Total Size',
            value: numeral(categories
                .reduce((total, cat) => total + (cat.actual as PhotoCategory).totalSize, 0)).format('0,0.00 b')
        });
    }

    // eslint-disable-next-line max-len
    private prepareChartData(years: number[], categories: Category[], selectedYear: number, aggregateBy: string): { name: string; value: number }[] {
        let agg: (category: Category) => number;

        if (aggregateBy === 'count') {
            agg = this.getPhotoCount;
        } else {
            agg = this.getPhotoSize;
        }

        if (selectedYear !== -1) {
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

    private getPhotoCount(category: Category): number {
        return (category.actual as PhotoCategory).photoCount;
    }

    private getPhotoSize(category: Category): number {
        return (category.actual as PhotoCategory).totalSize;
    }
}
