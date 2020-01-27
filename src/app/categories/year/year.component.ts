import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Settings } from 'src/app/core/models/settings.model';
import { CategoryListType } from 'src/app/core/models/category-list-type.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { CategoryTeaser } from 'src/app/core/models/category-teaser.model';
import {
    RootStoreSelectors,
    SettingsStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearComponent implements OnInit {
    @Input() year: number;

    categories$: Observable<CategoryTeaser[]>;
    settings$: Observable<Settings>;
    showListView$: Observable<boolean>;
    showGridView$: Observable<boolean>;
    listThumbnailSize$: Observable<ThumbnailSize>;

    constructor(
        private store$: Store<{}>
    ) {

    }

    ngOnInit() {
        this.listThumbnailSize$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListViewThumbnailSize)
            );

        this.showListView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.list.name)
            );

        this.showGridView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.grid.name)
            );

        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.categories$ = this.store$
            .pipe(
                select(RootStoreSelectors.selectAllFilteredCategoriesForYear, { year: this.year }),
                map(cats => cats.map(cat => ({
                    route: cat.categoryRoute,
                    id: cat.id,
                    year: cat.year,
                    name: cat.name,
                    teaserImageSqUrl: cat.teaserImageSq.url,
                    type: cat.type
                })))
            );
    }
}
