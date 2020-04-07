import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CategoryListType } from 'src/app/models/category-list-type.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { Settings } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-search-toolbar',
    templateUrl: './search-toolbar.component.html',
    styleUrls: ['./search-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchToolbarComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    settings: Settings;
    isListView$: Observable<boolean>;
    isGridView$: Observable<boolean>;
    showCategoryTitles$: Observable<boolean>;
    showCategoryYears$: Observable<boolean>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit(): void {
        this.isListView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchListType),
                map(type => type.name === CategoryListType.list.name)
            );

        this.isGridView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchListType),
                map(type => type.name === CategoryListType.grid.name)
            );

        this.showCategoryTitles$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchShowCategoryTitles)
            );

        this.showCategoryYears$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSearchShowCategoryYears)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onToggleListType(): void {
        if (this.settings) {
            const type = CategoryListType.nextType(this.settings.searchListType.name);

            this.store$.dispatch(SettingsStoreActions.updateSearchListTypeRequest({ newType: type }));
        }
    }

    onToggleYear(): void {
        this.store$.dispatch(SettingsStoreActions.toggleSearchCategoryYearsRequest());
    }

    onToggleTitle(): void {
        this.store$.dispatch(SettingsStoreActions.toggleSearchCategoryTitlesRequest());
    }

    onToggleListThumbnailSize(): void {
        if (this.settings) {
            const size = ThumbnailSize.nextSize(this.settings.searchListViewThumbnailSize.name);

            this.store$.dispatch(SettingsStoreActions.updateSearchListViewThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleSize(): void {
        if (this.settings && !this.settings.searchShowCategoryTitles && !this.settings.searchShowCategoryYears) {
            const size = ThumbnailSize.nextSize(this.settings.searchThumbnailSize.name);

            this.store$.dispatch(SettingsStoreActions.updateSearchThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.searchCategoryMargin.name);

            this.store$.dispatch(SettingsStoreActions.updateSearchCategoryMarginRequest({ newMargin }));
        }
    }
}
