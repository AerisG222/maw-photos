import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CategoryFilter } from 'src/app/models/category-filter.model';
import { CategoryListType } from 'src/app/models/category-list-type.model';
import { CategoryMargin } from 'src/app/models/category-margin.model';
import { Settings } from 'src/app/models/settings.model';
import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-shared-category-list-toolbar',
    templateUrl: './category-list-toolbar.component.html',
    styleUrls: ['./category-list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListToolbarComponent implements OnInit, OnDestroy {
    settings: Settings | null = null;
    isListView$: Observable<boolean> | null = null;
    isGridView$: Observable<boolean> | null = null;
    showCategoryTitles$ = this.store.select(SettingsStoreSelectors.categoryListShowCategoryTitles);

    private destroySub = new Subscription();

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.isListView$ = this.store
            .select(SettingsStoreSelectors.categoryListListType)
            .pipe(
                map(type => type.name === CategoryListType.list.name)
            );

        this.isGridView$ = this.store
            .select(SettingsStoreSelectors.categoryListListType)
            .pipe(
                map(type => type.name === CategoryListType.grid.name)
            );

        this.destroySub.add(this.store
            .select(SettingsStoreSelectors.settings)
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
            const type = CategoryListType.nextType(this.settings.categoryListListType.name);

            this.store.dispatch(SettingsStoreActions.updateCategoryListListTypeRequest({ newType: type }));
        }
    }

    onToggleTitle(): void {
        this.store.dispatch(SettingsStoreActions.toggleCategoryListCategoryTitlesRequest());
    }

    onToggleListThumbnailSize(): void {
        if (this.settings) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListListViewThumbnailSize.name);

            this.store.dispatch(SettingsStoreActions.updateCategoryListListViewThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleSize(): void {
        if (this.settings && !this.settings.categoryListShowCategoryTitles) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListThumbnailSize.name);

            this.store.dispatch(SettingsStoreActions.updateCategoryListThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleFilter(): void {
        if (this.settings) {
            const newFilter = CategoryFilter.nextFilter(this.settings.categoryListCategoryFilter.name);

            this.store.dispatch(SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter }));
        }
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.categoryListCategoryMargin.name);

            this.store.dispatch(SettingsStoreActions.updateCategoryListCategoryMarginRequest({ newMargin }));
        }
    }
}
