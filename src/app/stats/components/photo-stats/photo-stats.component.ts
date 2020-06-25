import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, Subscription, of, concat } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as numeral from 'numeral';

import { PhotoCategory } from 'src/app/models/photo-category.model';
import { PhotoCategoryStoreSelectors } from 'src/app/core/root-store';
import { StatDetail } from 'src/app/stats/models/stat-detail.model';
import { Category } from 'src/app/models/category.model';

@Component({
    selector: 'app-stats-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoStatsComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    form: FormGroup;
    chartData$: Observable<any>;
    chartValueFormat = 'count';
    selectedYear$ = new BehaviorSubject<number>(null);
    totalDetails$: Observable<StatDetail[]>;
    yearDetails$: Observable<StatDetail[]>;

    constructor(
        private formBuilder: FormBuilder,
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            aggregateBy: ['count']
        });

        const years$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectAllYears)
            );

        const categories$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectAllCategories)
            );

        const aggregateBy$ = concat(
                of('count'),
                this.form.get('aggregateBy').valueChanges as Observable<string>
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

        this.destroySub.add(aggregateBy$.subscribe());
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

    // tslint:disable-next-line: max-line-length
    private prepareChartData(years: number[], categories: Category[], selectedYear: number, aggregateBy: string): { name: string, value: number }[] {
        let agg = null;

        if (aggregateBy === 'count') {
            agg = this.getPhotoCount;
        } else {
            agg = this.getPhotoSize;
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

    private getPhotoCount(category: Category): number {
        return (category.actual as PhotoCategory).photoCount;
    }

    private getPhotoSize(category: Category): number {
        return (category.actual as PhotoCategory).totalSize;
    }
}
