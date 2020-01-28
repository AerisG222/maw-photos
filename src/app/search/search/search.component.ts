import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toolbarShow } from 'src/app/shared/animations';
import { queryRequest, clearRequest } from 'src/app/core/root-store/search-store/actions';
import { SearchResult } from 'src/app/core/models/search/search-result.model';
import { MultimediaCategory } from 'src/app/core/models/search/multimedia-category.model';
import { selectSearchAllResults, selectSearchCurrentResult } from 'src/app/core/root-store/search-store/selectors';
import { CategoryTeaser } from 'src/app/core/models/category-teaser.model';
import { CategoryType } from 'src/app/core/models/category-type.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { SettingsStoreSelectors } from 'src/app/core/root-store';
import { CategoryListType } from 'src/app/core/models/category-list-type.model';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';

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
    form: FormGroup;
    currentResult$: Observable<SearchResult<MultimediaCategory>>;
    categories$: Observable<CategoryTeaser[]>;
    showListView$: Observable<boolean>;
    showGridView$: Observable<boolean>;
    gridShowTitles$: Observable<boolean>;
    gridShowYears$: Observable<boolean>;
    listThumbnailSize$: Observable<ThumbnailSize>;
    gridThumbnailSize$: Observable<ThumbnailSize>;
    margin$: Observable<CategoryMargin>;

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            query: ['', Validators.required]
        });

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
                select(SettingsStoreSelectors.selectSettings),
                map(settings => {
                    if (!settings.searchShowCategoryTitles) {
                        return settings.searchThumbnailSize;
                    }

                    return ThumbnailSize.default;
                })
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
                    route: `${ cat.multimediaType }s`,
                    id: cat.id,
                    year: cat.year,
                    name: cat.name,
                    teaserImageSqUrl: cat.teaserPhotoSqPath,
                    type: cat.multimediaType === 'photo' ? CategoryType.photo : CategoryType.video
                })))
            );
    }

    ngOnDestroy() {
        this.store$.dispatch(clearRequest());
    }

    onSearch() {
        const searchTerm = this.form.get('query').value;

        this.store$.dispatch(queryRequest({ query: searchTerm }));
    }
}
