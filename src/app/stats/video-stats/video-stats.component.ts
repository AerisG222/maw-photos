import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';
import * as numeral from 'numeral';

import { StatDetail } from '../models/stat-detail.model';
import { RootStoreState, VideoCategoryStoreSelectors, VideoCategoryStoreActions } from 'src/app/core/root-store';
import { VideoCategory } from 'src/app/core/models/video-category.model';

@Component({
    selector: 'app-video-stats',
    templateUrl: './video-stats.component.html',
    styleUrls: ['./video-stats.component.scss']
})
export class VideoStatsComponent implements OnInit {
    form: FormGroup;
    aggregateBy$ = new BehaviorSubject<string>('count');
    destroy$ = new Subject<boolean>();
    chartData$: Observable<any>;
    chartValueFormat = 'count';
    selectedYear$ = new BehaviorSubject<number>(null);
    totalDetails$: Observable<StatDetail[]>;
    yearDetails$: Observable<StatDetail[]>;

    constructor(
        private _formBuilder: FormBuilder,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.form = this._formBuilder.group({
            aggregateBy: ['count']
        });

        const years$ = this._store$
            .pipe(
                select(VideoCategoryStoreSelectors.selectAllYears),
                takeUntil(this.destroy$)
            );

        const categories$ = this._store$
            .pipe(
                select(VideoCategoryStoreSelectors.selectAllCategories),
                takeUntil(this.destroy$)
            );

        this.form.get('aggregateBy').valueChanges
            .pipe(
                tap(val => this.aggregateBy$.next(val)),
                tap(val => this.chartValueFormat = val),
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.chartData$ = combineLatest(
                years$,
                categories$,
                this.selectedYear$,
                this.aggregateBy$
            )
            .pipe(
                map(x => this.prepareChartData(x[0], x[1], x[2], x[3]))
            );

        this.totalDetails$ = combineLatest(
                years$,
                categories$,
            )
            .pipe(
                map(x => this.prepareTotalDetails(x[0], x[1]))
            );

        this.yearDetails$ = combineLatest(
                categories$,
                this.selectedYear$
            )
            .pipe(
                map(x => this.prepareYearDetails(x[0], x[1]))
            );

        years$.subscribe();
        categories$.subscribe();

        this._store$.dispatch(new VideoCategoryStoreActions.LoadRequestAction());
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
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

    private prepareTotalDetails(years: number[], categories: VideoCategory[]): StatDetail[] {
        const details: StatDetail[] = [];

        details.push({
            name: 'Years',
            value: years.length.toString()
        });

        this.populateDetails(categories, details);

        return details;
    }

    private prepareYearDetails(categories:VideoCategory[], selectedYear: number): StatDetail[] {
        const details: StatDetail[] = [];

        categories = categories.filter(x => x.year === selectedYear);

        this.populateDetails(categories, details);

        return details;
    }

    private populateDetails(categories: VideoCategory[], details: StatDetail[]): void {
        details.push({
            name: 'Categories',
            value: numeral(categories.length).format('0,0')
        });

        details.push({
            name: 'Videos',
            value: numeral(categories
                    .reduce((total, cat) => total + cat.videoCount, 0)
                ).format('0,0')
        });

        details.push({
            name: 'Total Size',
            value: numeral(categories
                .reduce((total, cat) => total + cat.totalSize, 0)).format('0,0.00 b')
        });

        details.push({
            name: 'Total Duration',
            value: numeral(categories
                .reduce((total, cat) => total + cat.totalDuration, 0)).format('00:00:00')
        });
    }

    private prepareChartData(years: number[], categories: VideoCategory[], selectedYear: number, aggregateBy: string) {
        let agg = null;

        switch(aggregateBy) {
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

        if (selectedYear !== null) {
            return categories
                .filter(cat => cat.year === selectedYear)
                .map(cat => ({
                        'name': cat.name,
                        'value':agg(cat)
                    })
                );
        }

        return years
            .map(year => ({
                'name': year.toString(),
                'value':  categories
                    .filter(cat => cat.year === year)
                    .reduce((total, cat) => total + agg(cat), 0)
            }));
    }

    private getVideoCount(category: VideoCategory): number {
        return category.videoCount;
    }

    private getVideoSize(category: VideoCategory): number {
        return category.totalSize;
    }

    private getVideoDuration(category: VideoCategory): number {
        return category.totalDuration;
    }
}
