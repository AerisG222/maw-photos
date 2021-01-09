import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, Subscription, concat, of } from 'rxjs';
import { tap, map, delay, filter } from 'rxjs/operators';
import numbro from 'numbro';

import { StatDetail } from 'src/app/stats/models/stat-detail.model';
import { VideoCategoryStoreSelectors } from '@core/root-store';
import { VideoCategory } from '@models/video-category.model';
import { Category } from '@models/category.model';
import { FormattedStatDetail } from '../../models/formatted-stat-detail.model';

@Component({
    selector: 'app-stats-video-stats',
    templateUrl: './video-stats.component.html',
    styleUrls: ['./video-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoStatsComponent implements OnInit, OnDestroy {
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
        const years$ = this.store.select(VideoCategoryStoreSelectors.allYears);
        const categories$ = this.store.select(VideoCategoryStoreSelectors.allCategories);

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
            value: numbro(categories.length).format({ thousandSeparated: true })
        });

        details.push({
            name: 'Videos',
            value: numbro(categories
                    .reduce((total, cat) => total + (cat.actual as VideoCategory).videoCount, 0)
                ).format({ thousandSeparated: true })
        });

        details.push({
            name: 'Total Size',
            value: numbro(categories
                // eslint-disable-next-line max-len
                .reduce((total, cat) => total + (cat.actual as VideoCategory).totalSize, 0)).format({ output: 'byte', base: 'decimal', mantissa: 2, spaceSeparated: true })
        });

        details.push({
            name: 'Total Duration',
            value: numbro(categories
                .reduce((total, cat) => total + (cat.actual as VideoCategory).totalDuration, 0)).format({ output: 'time' })
        });
    }

    // eslint-disable-next-line max-len
    private prepareChartData(years: number[], categories: Category[], selectedYear: number, aggregateBy: string): StatDetail[] {
        let agg: (category: Category) => number;

        switch (aggregateBy) {
            case 'count':
                agg = this.getVideoCount;
                break;
            case 'size':
                agg = this.getVideoSize;
                break;
            case 'time':
                agg = this.getVideoDuration;
                break;
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

    private getVideoCount(category: Category): number {
        return (category.actual as VideoCategory).videoCount;
    }

    private getVideoSize(category: Category): number {
        return (category.actual as VideoCategory).totalSize;
    }

    private getVideoDuration(category: Category): number {
        return (category.actual as VideoCategory).totalDuration;
    }
}
