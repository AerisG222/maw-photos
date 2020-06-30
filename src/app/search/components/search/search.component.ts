import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchResult } from 'src/app/search/models/search-result.model';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';
import { selectSearchAllResults, selectSearchCurrentResult, selectSearchHasMoreResults } from 'src/app/search/store/selectors';
import { CategoryTeaser } from 'src/app/models/category-teaser.model';
import { CategoryType } from 'src/app/models/category-type.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { SettingsStoreSelectors } from 'src/app/core/root-store';
import { CategoryListType } from 'src/app/models/category-list-type.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { clearRequest } from 'src/app/search/store/actions';

@Component({
    selector: 'app-search-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
    currentResult$?: Observable<SearchResult<MultimediaCategory> | undefined>;
    categories$?: Observable<CategoryTeaser[]>;
    showListView$?: Observable<boolean>;
    showGridView$?: Observable<boolean>;
    gridShowTitles$?: Observable<boolean>;
    gridShowYears$?: Observable<boolean>;
    listThumbnailSize$?: Observable<ThumbnailSize>;
    gridThumbnailSize$?: Observable<ThumbnailSize>;
    margin$?: Observable<CategoryMargin>;
    hasMoreResults$?: Observable<boolean>;
    totalResults$?: Observable<number>;
    shownResults$?: Observable<number>;
    showNoResults$?: Observable<boolean>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
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
                    route: `/${ cat.multimediaType }s`,
                    id: cat.id,
                    year: cat.year,
                    name: cat.name,
                    teaserImage: {
                        height: cat.teaserPhotoHeight,
                        width: cat.teaserPhotoWidth,
                        url: cat.teaserPhotoPath,
                        size: 0
                    },
                    teaserImageSq: {
                        height: cat.teaserPhotoSqHeight,
                        width: cat.teaserPhotoSqWidth,
                        url: cat.teaserPhotoSqPath,
                        size: 0
                    },
                    type: cat.multimediaType === 'photo' ? CategoryType.photo : CategoryType.video
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

    ngOnDestroy(): void {
        this.store$.dispatch(clearRequest());
    }
}
