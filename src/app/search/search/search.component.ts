import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { toolbarShow } from 'src/app/shared/animations';
import { SearchResult } from 'src/app/core/models/search/search-result.model';
import { MultimediaCategory } from 'src/app/core/models/search/multimedia-category.model';
import { selectSearchAllResults, selectSearchCurrentResult, selectSearchHasMoreResults } from 'src/app/core/root-store/search-store/selectors';
import { CategoryTeaser } from 'src/app/core/models/category-teaser.model';
import { CategoryType } from 'src/app/core/models/category-type.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { SettingsStoreSelectors } from 'src/app/core/root-store';
import { CategoryListType } from 'src/app/core/models/category-list-type.model';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import { clearRequest } from 'src/app/core/root-store/search-store/actions';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
    currentResult$: Observable<SearchResult<MultimediaCategory>>;
    categories$: Observable<CategoryTeaser[]>;
    showListView$: Observable<boolean>;
    showGridView$: Observable<boolean>;
    gridShowTitles$: Observable<boolean>;
    gridShowYears$: Observable<boolean>;
    listThumbnailSize$: Observable<ThumbnailSize>;
    gridThumbnailSize$: Observable<ThumbnailSize>;
    margin$: Observable<CategoryMargin>;
    hasMoreResults$: Observable<boolean>;
    totalResults$: Observable<number>;
    shownResults$: Observable<number>;
    showNoResults$: Observable<boolean>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit() {
        this.margin$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchCategoryMargin)
            );

        this.showListView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchListType),
                map(type => type.name === CategoryListType.list.name)
            );

        this.showGridView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchListType),
                map(type => type.name === CategoryListType.grid.name)
            );

        this.listThumbnailSize$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchListViewThumbnailSize)
            );

        this.gridThumbnailSize$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchThumbnailSize)
            );

        this.gridShowTitles$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchShowCategoryTitles)
            );

        this.gridShowYears$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchShowCategoryYears)
            );

        this.currentResult$ = this.store$
            .pipe(
                select(selectSearchCurrentResult)
            );

        this.categories$ = this.store$
            .pipe(
                select(selectSearchAllResults),
                map(cats => cats.map(cat => ({
                    route: `/categories/${ cat.multimediaType }s`,
                    id: cat.id,
                    year: cat.year,
                    name: cat.name,
                    teaserImageSqUrl: cat.teaserPhotoSqPath,
                    type: cat.multimediaType === 'photo' ? CategoryType.photo : CategoryType.video,
                    trackBy: `${ cat.multimediaType }_${ cat.id }`
                })))
            );

        this.hasMoreResults$ = this.store$
            .pipe(
                select(selectSearchHasMoreResults)
            );

        this.totalResults$ = this.store$
            .pipe(
                select(selectSearchCurrentResult),
                map(c => (!!c) ? c.totalFound : 0)
            );

        this.shownResults$ = this.store$
            .pipe(
                select(selectSearchCurrentResult),
                map(c => (!!c) ? c.startIndex + c.results.length : 0)
            );

        this.showNoResults$ = this.store$
            .pipe(
                select(selectSearchCurrentResult),
                map(c => (!!c) ? c.totalFound === 0 : false)
            );
    }

    ngOnDestroy() {
        this.store$.dispatch(clearRequest());
    }
}
