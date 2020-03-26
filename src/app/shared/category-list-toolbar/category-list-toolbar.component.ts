import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CategoryFilter } from 'src/app/core/models/category-filter.model';
import { CategoryListType } from 'src/app/core/models/category-list-type.model';
import { CategoryMargin } from 'src/app/core/models/category-margin.model';
import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-category-list-toolbar',
    templateUrl: './category-list-toolbar.component.html',
    styleUrls: ['./category-list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListToolbarComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    settings: Settings;
    isListView$: Observable<boolean>;
    isGridView$: Observable<boolean>;
    showCategoryTitles$: Observable<boolean>;

    constructor(
        private store$: Store
    ) { }

    ngOnInit(): void {
        this.isListView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.list.name)
            );

        this.isGridView$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListListType),
                map(type => type.name === CategoryListType.grid.name)
            );

        this.showCategoryTitles$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListShowCategoryTitles)
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
            const type = CategoryListType.nextType(this.settings.categoryListListType.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListListTypeRequest({ newType: type }));
        }
    }

    onToggleTitle(): void {
        this.store$.dispatch(SettingsStoreActions.toggleCategoryListCategoryTitlesRequest());
    }

    onToggleListThumbnailSize(): void {
        if (this.settings) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListListViewThumbnailSize.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListListViewThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleSize(): void {
        if (this.settings && !this.settings.categoryListShowCategoryTitles) {
            const size = ThumbnailSize.nextSize(this.settings.categoryListThumbnailSize.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListThumbnailSizeRequest({ newSize: size }));
        }
    }

    onToggleFilter(): void {
        if (this.settings) {
            const newFilter = CategoryFilter.nextFilter(this.settings.categoryListCategoryFilter.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter }));
        }
    }

    onToggleMargins(): void {
        if (this.settings) {
            const newMargin = CategoryMargin.nextSize(this.settings.categoryListCategoryMargin.name);

            this.store$.dispatch(SettingsStoreActions.updateCategoryListCategoryMarginRequest({ newMargin }));
        }
    }
}
