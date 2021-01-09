import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import {
    CategoryFilter,
    CategoryListType,
    CategoryMargin,
    Settings,
    ThumbnailSize,
 } from '@models';
import { SettingsStoreSelectors, SettingsStoreActions } from '@core/root-store';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-shared-category-list-toolbar',
    templateUrl: './category-list-toolbar.component.html',
    styleUrls: ['./category-list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListToolbarComponent {
    isListView$ = this.store.select(SettingsStoreSelectors.categoryListShouldShowListView);
    isGridView$ = this.store.select(SettingsStoreSelectors.categoryListShouldShowGridView);
    showCategoryTitles$ = this.store.select(SettingsStoreSelectors.categoryListShowCategoryTitles);

    constructor(private store: Store) {

    }
    onToggleTitle(): void {
        this.store.dispatch(SettingsStoreActions.toggleCategoryListCategoryTitlesRequest());
    }

    onToggleListType(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const type = CategoryListType.nextType(settings.categoryListListType.name);

                this.store.dispatch(SettingsStoreActions.updateCategoryListListTypeRequest({ newType: type }));
            }
        });
    }

    onToggleListThumbnailSize(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const size = ThumbnailSize.nextSize(settings.categoryListListViewThumbnailSize.name);

                this.store.dispatch(SettingsStoreActions.updateCategoryListListViewThumbnailSizeRequest({ newSize: size }));
            }
        });
    }

    onToggleSize(): void {
        this.execWithSettings(settings => {
            if (!!settings && !settings.categoryListShowCategoryTitles) {
                const size = ThumbnailSize.nextSize(settings.categoryListThumbnailSize.name);

                this.store.dispatch(SettingsStoreActions.updateCategoryListThumbnailSizeRequest({ newSize: size }));
            }
        });
    }

    onToggleFilter(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const newFilter = CategoryFilter.nextFilter(settings.categoryListCategoryFilter.name);

                this.store.dispatch(SettingsStoreActions.updateCategoryListCategoryFilterRequest({ newFilter }));
            }
        });
    }

    onToggleMargins(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const newMargin = CategoryMargin.nextSize(settings.categoryListCategoryMargin.name);

                this.store.dispatch(SettingsStoreActions.updateCategoryListCategoryMarginRequest({ newMargin }));
            }
        });
    }

    private execWithSettings(func: (settings: Settings) => void): void {
        this.store.select(SettingsStoreSelectors.settings)
            .pipe(
                first()
            ).subscribe({
                next: settings => func(settings),
                error: err => console.log(`error trying to update settings: ${ err }`)
            });
    }
}
