import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchStoreSelectors } from 'src/app/search/store';
import { CategoryTeaser } from 'src/app/models/category-teaser.model';
import { CategoryType } from 'src/app/models/category-type.model';
import { SettingsStoreSelectors } from 'src/app/core/root-store';
import { CategoryListType } from 'src/app/models/category-list-type.model';
import { clearRequest } from 'src/app/search/store/actions';

@Component({
    selector: 'app-search-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
    categories$: Observable<CategoryTeaser[]> | null = null;
    showListView$: Observable<boolean> | null = null;
    showGridView$: Observable<boolean> | null = null;
    totalResults$: Observable<number> | null = null;
    showTotalResults$: Observable<boolean> | null = null;
    shownResults$: Observable<number> | null = null;
    showNoResults$: Observable<boolean> | null = null;
    hasMoreResults$ = this.store.select(SearchStoreSelectors.hasMoreResults);
    margin$ = this.store.select(SettingsStoreSelectors.searchCategoryMargin);
    currentResult$ = this.store.select(SearchStoreSelectors.activeResult);
    gridShowTitles$ = this.store.select(SettingsStoreSelectors.searchShowCategoryTitles);
    gridShowYears$ = this.store.select(SettingsStoreSelectors.searchShowCategoryYears);
    listThumbnailSize$ = this.store.select(SettingsStoreSelectors.searchListViewThumbnailSize);
    gridThumbnailSize$ = this.store.select(SettingsStoreSelectors.searchThumbnailSize);

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.showListView$ = this.store
            .select(SettingsStoreSelectors.searchListType)
            .pipe(
                map(type => type.name === CategoryListType.list.name)
            );

        this.showGridView$ = this.store
            .select(SettingsStoreSelectors.searchListType)
            .pipe(
                map(type => type.name === CategoryListType.grid.name)
            );

        this.categories$ = this.store
            .select(SearchStoreSelectors.allResults)
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

        this.totalResults$ = this.store
            .select(SearchStoreSelectors.activeResult)
            .pipe(
                map(c => c?.totalFound ?? 0)
            );

        this.showTotalResults$ = this.totalResults$
            .pipe(
                map(x => x > 0)
            );

        this.shownResults$ = this.store
            .select(SearchStoreSelectors.activeResult)
            .pipe(
                map(c => (!!c) ? c.startIndex + c.results.length : 0)
            );

        this.showNoResults$ = this.store
            .select(SearchStoreSelectors.activeResult)
            .pipe(
                map(c => (!!c) ? c.totalFound === 0 : false)
            );
    }

    ngOnDestroy(): void {
        this.store.dispatch(clearRequest());
    }
}
