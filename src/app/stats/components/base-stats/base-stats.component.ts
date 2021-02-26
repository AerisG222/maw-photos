import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import numbro from 'numbro';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';

import {
    StatDetail,
    FormattedStatDetail,
    YearStatSummary,
    CategoryStatSummary,
    TotalStatSummary,
    StatType,
} from '@models';
import { StatsStoreActions, StatsStoreSelectors } from '../../store';

@Component({
    selector: 'app-base-stats',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseStatsComponent {
    selectedYear$ = this.store.select(StatsStoreSelectors.effectiveYear);
    aggregateBy$ = new BehaviorSubject<string>('count');
    chartData$: Observable<StatDetail[]>;
    overallDetails$: Observable<FormattedStatDetail[]>;

    constructor(
        public store: Store,
        private statType: StatType,
        private totalStats$: Observable<TotalStatSummary>,
    ) {
        this.chartData$ = combineLatest([
            this.totalStats$,
            this.aggregateBy$,
            this.selectedYear$,
        ]).pipe(
            map(([stats, aggregateBy, year]) => {
                if (year === -1) {
                    switch (aggregateBy) {
                        case 'count':
                            return getTotalCountStatDetails(
                                stats.statsByYear.values()
                            );
                        case 'size':
                            return getTotalSizeStatDetails(
                                stats.statsByYear.values()
                            );
                        case 'time':
                            return getTotalDurationStatDetails(
                                stats.statsByYear.values()
                            );
                    }
                } else {
                    const catStats = stats.statsByYear
                        .get(year)
                        ?.statsByCategory.values();

                    if (catStats) {
                        switch (aggregateBy) {
                            case 'count':
                                return getYearCountStatDetails(catStats);
                            case 'size':
                                return getYearSizeStatDetails(catStats);
                            case 'time':
                                return getYearDurationStatDetails(catStats);
                        }
                    }
                }

                return [];
            })
        );

        this.overallDetails$ = combineLatest([
            this.totalStats$,
            this.selectedYear$,
        ]).pipe(
            filter(
                ([details, year]) =>
                    details.yearCount > 0 &&
                    (year === -1 || details.statsByYear.has(year))
            ),
            map(([details, year]) => {
                const overallDetails = [];
                let categories = 0;
                let items = 0;
                let size = 0;
                let duration = 0;

                if (year === -1) {
                    overallDetails.push({
                        name: 'Years',
                        value: details.yearCount.toString(),
                    });

                    categories = details.categoryCount;
                    items = details.itemCount;
                    size = details.size;
                    duration = details.durationSeconds;
                } else {
                    const yearStat = details.statsByYear.get(year);

                    if (yearStat) {
                        categories = yearStat.categoryCount;
                        items = yearStat.itemCount;
                        size = yearStat.size;
                        duration = yearStat.durationSeconds;
                    }
                }

                overallDetails.push({
                    name: 'Categories',
                    value: numbro(categories).format({
                        thousandSeparated: true,
                    }),
                });

                overallDetails.push({
                    name: this.getStatTypeName(),
                    value: numbro(items).format({
                        thousandSeparated: true,
                    }),
                });

                overallDetails.push({
                    name: 'File Size',
                    value: numbro(size).format({
                        output: 'byte',
                        base: 'decimal',
                        mantissa: 2,
                        spaceSeparated: true,
                    }),
                });

                if (this.statType === StatType.videos) {
                    overallDetails.push({
                        name: 'Duration',
                        value: numbro(duration).format({
                            output: 'time',
                        }),
                    });
                }

                return overallDetails;
            })
        );
    }

    onSelectAggregate(evt: string): void {
        this.aggregateBy$.next(evt);
    }

    onSelectYear(evt: StatDetail): void {
        this.selectedYear$.pipe(
            first()
        ).subscribe({
            next: year => {
                // ignore clicks on categories within year view
                if(!year || year <= 0) {
                    this.store.dispatch(StatsStoreActions.selectYear({ year: Number(evt.name) }))
                }
            }
        });
    }

    private getStatTypeName(): string {
        switch (this.statType) {
            case StatType.photos:
                return 'Photos';
            case StatType.videos:
                return 'Videos';
            case StatType.combined:
                return 'Combined';
        }
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

const getTotalDurationStatDetails = (
    stats: IterableIterator<YearStatSummary>
): StatDetail[] => {
    return Array.from(stats, (x) => ({
        name: x.year.toString(),
        value: x.durationSeconds,
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

const getYearDurationStatDetails = (
    stats: IterableIterator<CategoryStatSummary>
): StatDetail[] => {
    return Array.from(stats, (x) => ({
        name: x.categoryName,
        value: x.durationSeconds,
    }));
};
