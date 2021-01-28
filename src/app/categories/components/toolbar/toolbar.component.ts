import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import {
    CategoryMargin,
    Settings,
    ThumbnailSize,
 } from '@models';
import { SettingsStoreSelectors, SettingsStoreActions, RouterStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-shared-category-list-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    isListView$ = this.store.select(RouterStoreSelectors.isCategoriesListView);
    isGridView$ = this.store.select(RouterStoreSelectors.isCategoriesGridView);
    showCategoryTitles$ = this.store.select(SettingsStoreSelectors.categoryListShowCategoryTitles);

    constructor(private store: Store) {

    }

    onToggleTitle(): void {
        this.store.dispatch(SettingsStoreActions.toggleCategoryListCategoryTitlesRequest());
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

    onToggleMargins(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const newMargin = CategoryMargin.nextSize(settings.categoryListCategoryMargin.name);

                this.store.dispatch(SettingsStoreActions.updateCategoryListCategoryMarginRequest({ newMargin }));
            }
        });
    }

    onSelectGridView(): void {
        this.store.dispatch(SettingsStoreActions.selectCategoryGridViewMode());
    }

    onSelectListView(): void {
        this.store.dispatch(SettingsStoreActions.selectCategoryListViewMode());
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
