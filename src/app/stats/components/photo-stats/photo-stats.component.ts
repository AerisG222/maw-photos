import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith, delay, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import numbro from 'numbro';

import { YearStatSummary, FormattedStatDetail, StatDetail, CategoryStatSummary } from '@models';
import { PhotoCategoryStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-stats-photo-stats',
    templateUrl: './photo-stats.component.html',
    styleUrls: ['./photo-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoStatsComponent {
    form: FormGroup;
    selectedYear$ = new BehaviorSubject<number>(-1);
    aggregateBy$: Observable<string>;
    chartData$: Observable<StatDetail[]>;
    overallDetails$: Observable<FormattedStatDetail[]> | null = null;

    constructor(private formBuilder: FormBuilder, private store: Store) {
        this.form = this.formBuilder.group({
            aggregateBy: ['count'],
        });

        this.aggregateBy$ = this.form
            .get('aggregateBy')
            ?.valueChanges.pipe(startWith('count')) as Observable<string>;

        this.chartData$ = combineLatest([
            this.store.select(PhotoCategoryStoreSelectors.totalStats),
            this.aggregateBy$,
            this.selectedYear$,
        ]).pipe(
            delay(3), // delay so that the format function is set before sending data
            map(([stats, aggregateBy, year]) => {

                if(year === -1) {
                    if (aggregateBy === 'count') {
                        return getTotalCountStatDetails(stats.statsByYear.values());
                    } else {
                        return getTotalSizeStatDetails(stats.statsByYear.values());
                    }
                } else {
                    const catStats = stats.statsByYear.get(year)?.statsByCategory.values();

                    if(catStats) {
                        if (aggregateBy === 'count') {
                            return getYearCountStatDetails(catStats);
                        } else {
                            return getYearSizeStatDetails(catStats);
                        }
                    }
                }

                return [];
            })
        );

        this.overallDetails$ = combineLatest([
            this.store.select(PhotoCategoryStoreSelectors.totalStats),
            this.selectedYear$,
        ]).pipe(
            filter(
                ([details, year]) =>
                    details.yearCount > 0 && (year === -1 || details.statsByYear.has(year))
            ),
            map(([details, year]) => {
                const overallDetails = [];
                let categories = 0;
                let photos = 0;
                let size = 0;

                if (year === -1) {
                    overallDetails.push({
                        name: 'Years',
                        value: details.yearCount.toString(),
                    });

                    categories = details.categoryCount;
                    photos = details.itemCount;
                    size = details.size;
                } else {
                    const yearStat = details.statsByYear.get(year);

                    if (yearStat) {
                        categories = yearStat.categoryCount;
                        photos = yearStat.itemCount;
                        size = yearStat.size;
                    }
                }

                overallDetails.push({
                    name: 'Categories',
                    value: numbro(categories).format({
                        thousandSeparated: true,
                    }),
                });

                overallDetails.push({
                    name: 'Photos',
                    value: numbro(photos).format({
                        thousandSeparated: true,
                    }),
                });

                overallDetails.push({
                    name: 'Total Size',
                    value: numbro(size).format({
                        output: 'byte',
                        base: 'decimal',
                        mantissa: 2,
                        spaceSeparated: true,
                    }),
                });

                return overallDetails;
            })
        );
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
}

const getTotalCountStatDetails = (
    stats: IterableIterator<YearStatSummary>
): StatDetail[] => {
    return Array.from(stats, (x) => ({
        name: x.year.toString(),
        value: x.itemCount,
    }));
};

const getTotalSizeStatDetails = (
    stats: IterableIterator<YearStatSummary>
): StatDetail[] => {
    return Array.from(stats, (x) => ({
        name: x.year.toString(),
        value: x.size,
    }));
};

const getYearCountStatDetails = (
    stats: IterableIterator<CategoryStatSummary>
): StatDetail[] => {
    return Array.from(stats, (x) => ({
        name: x.categoryName,
        value: x.itemCount,
    }));
};

const getYearSizeStatDetails = (
    stats: IterableIterator<CategoryStatSummary>
): StatDetail[] => {
    return Array.from(stats, (x) => ({
        name: x.categoryName,
        value: x.size,
    }));
};
