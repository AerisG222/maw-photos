import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchResult } from 'src/app/search/models/search-result.model';
import { MultimediaCategory } from 'src/app/search/models/multimedia-category.model';
import { SearchStoreSelectors } from 'src/app/search/store';
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
    currentResult$: Observable<SearchResult<MultimediaCategory> | null> | null = null;
    categories$: Observable<CategoryTeaser[]> | null = null;
    showListView$: Observable<boolean> | null = null;
    showGridView$: Observable<boolean> | null = null;
    gridShowTitles$: Observable<boolean> | null = null;
    gridShowYears$: Observable<boolean> | null = null;
    listThumbnailSize$: Observable<ThumbnailSize> | null = null;
    gridThumbnailSize$: Observable<ThumbnailSize> | null = null;
    margin$: Observable<CategoryMargin> | null = null;
    hasMoreResults$: Observable<boolean> | null = null;
    totalResults$: Observable<number> | null = null;
    showTotalResults$: Observable<boolean> | null = null;
    shownResults$: Observable<number> | null = null;
    showNoResults$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.margin$ = this.store.select(SettingsStoreSelectors.selectSearchCategoryMargin);

        this.showListView$ = this.store
            .select(SettingsStoreSelectors.selectSearchListType)
            .pipe(
                map(type => type.name === CategoryListType.list.name)
            );

        this.showGridView$ = this.store
            .select(SettingsStoreSelectors.selectSearchListType)
            .pipe(
                map(type => type.name === CategoryListType.grid.name)
            );

        this.listThumbnailSize$ = this.store.select(SettingsStoreSelectors.selectSearchListViewThumbnailSize);
        this.gridThumbnailSize$ = this.store.select(SettingsStoreSelectors.selectSearchThumbnailSize);
        this.gridShowTitles$ = this.store.select(SettingsStoreSelectors.selectSearchShowCategoryTitles);
        this.gridShowYears$ = this.store.select(SettingsStoreSelectors.selectSearchShowCategoryYears);
        this.currentResult$ = this.store.select(SearchStoreSelectors.selectSearchCurrentResult);

        this.categories$ = this.store
            .select(SearchStoreSelectors.selectSearchAllResults)
            .pipe(
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

        this.hasMoreResults$ = this.store.select(SearchStoreSelectors.selectSearchHasMoreResults);

        this.totalResults$ = this.store
            .select(SearchStoreSelectors.selectSearchCurrentResult)
            .pipe(
                map(c => c?.totalFound ?? 0)
            );

        this.showTotalResults$ = this.totalResults$
            .pipe(
                map(x => x > 0)
            );

        this.shownResults$ = this.store
            .select(SearchStoreSelectors.selectSearchCurrentResult)
            .pipe(
                map(c => (!!c) ? c.startIndex + c.results.length : 0)
            );

        this.showNoResults$ = this.store
            .select(SearchStoreSelectors.selectSearchCurrentResult)
            .pipe(
                map(c => (!!c) ? c.totalFound === 0 : false)
            );
    }

    ngOnDestroy(): void {
        this.store.dispatch(clearRequest());
    }
}
