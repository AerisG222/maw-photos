import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CategoryListType } from 'src/app/models/category-list-type.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { Settings } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-search-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
    settings: Settings | null = null;
    isListView$: Observable<boolean> | null = null;
    isGridView$: Observable<boolean> | null = null;
    showCategoryTitles$: Observable<boolean> | null = null;
    showCategoryYears$: Observable<boolean> | null = null;

    private destroySub = new Subscription();

    constructor(
        private store: Store
    ) { }

    ngOnInit(): void {
        this.isListView$ = this.store
            .select(SettingsStoreSelectors.selectSearchListType)
            .pipe(
                map(type => type.name === CategoryListType.list.name)
            );

        this.isGridView$ = this.store
            .select(SettingsStoreSelectors.selectSearchListType)
            .pipe(
                map(type => type.name === CategoryListType.grid.name)
            );

        this.showCategoryTitles$ = this.store.select(SettingsStoreSelectors.selectSearchShowCategoryTitles);
        this.showCategoryYears$ = this.store.select(SettingsStoreSelectors.selectSearchShowCategoryYears);

        this.destroySub.add(this.store
            .select(SettingsStoreSelectors.selectSettings)
            .pipe(
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

            this.store.dispatch(SettingsStoreActions.updateSearchListTypeRequest({ newType: type }));
        }
    }

    onToggleYear(): void {
        this.store.dispatch(SettingsStoreActions.toggleSearchCategoryYearsRequest());
    }

    onToggleTitle(): void {
        this.store.dispatch(SettingsStoreActions.toggleSearchCategoryTitlesRequest());
    }

    onToggleListThumbnailSize(): void {
        if (this.settings) {
            const size = ThumbnailSize.nextSize(this.settings.searchListViewThumbnailSize.name);

            this.store.dispatch(SettingsStoreActions.updateSearchListViewThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleSize(): void {
        if (this.settings && !this.settings.searchShowCategoryTitles && !this.settings.searchShowCategoryYears) {
            const size = ThumbnailSize.nextSize(this.settings.searchThumbnailSize.name);

            this.store.dispatch(SettingsStoreActions.updateSearchThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.searchCategoryMargin.name);

            this.store.dispatch(SettingsStoreActions.updateSearchCategoryMarginRequest({ newMargin }));
        }
    }
}
