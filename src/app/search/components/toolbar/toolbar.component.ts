import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { CategoryListType } from '@models/category-list-type.model';
import { CategoryMargin } from '@models/category-margin.model';
import { ThumbnailSize } from '@models/thumbnail-size.model';
import { SettingsStoreSelectors, SettingsStoreActions } from '@core/root-store';
import { first } from 'rxjs/operators';
import { Settings } from '@models/settings.model';

@Component({
    selector: 'app-search-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    isListView$ = this.store.select(SettingsStoreSelectors.showSearchResultsInListView);
    isGridView$ = this.store.select(SettingsStoreSelectors.showSearchResultsInGridView);
    showCategoryTitles$ = this.store.select(SettingsStoreSelectors.searchShowCategoryTitles);
    showCategoryYears$ = this.store.select(SettingsStoreSelectors.searchShowCategoryYears);

    constructor(
        private store: Store
    ) {

    }

    onToggleYear(): void {
        this.store.dispatch(SettingsStoreActions.toggleSearchCategoryYearsRequest());
    }

    onToggleTitle(): void {
        this.store.dispatch(SettingsStoreActions.toggleSearchCategoryTitlesRequest());
    }

    onToggleListType(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const type = CategoryListType.nextType(settings.searchListType.name);

                this.store.dispatch(SettingsStoreActions.updateSearchListTypeRequest({ newType: type }));
            }
        });
    }

    onToggleListThumbnailSize(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const size = ThumbnailSize.nextSize(settings.searchListViewThumbnailSize.name);

                this.store.dispatch(SettingsStoreActions.updateSearchListViewThumbnailSizeRequest({ newSize: size }));
            }
        });
    }

    onToggleSize(): void {
        this.execWithSettings(settings => {
            if (!!settings && !settings.searchShowCategoryTitles && !settings.searchShowCategoryYears) {
                const size = ThumbnailSize.nextSize(settings.searchThumbnailSize.name);

                this.store.dispatch(SettingsStoreActions.updateSearchThumbnailSizeRequest({ newSize: size }));
            }
        });
    }

    onToggleMargins(): void {
        this.execWithSettings(settings => {
            if (!!settings) {
                const newMargin = CategoryMargin.nextSize(settings.searchCategoryMargin.name);

                this.store.dispatch(SettingsStoreActions.updateSearchCategoryMarginRequest({ newMargin }));
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
