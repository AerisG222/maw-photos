import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CategoryListSettingsFacade } from '@core/facades/settings/category-list-settings-facade';
import { ThumbnailSize, Margin, Category } from '@models';
import { CategoriesStoreSelectors } from '../../store';

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
    listSettings$ = this.listViewFacade.settings$;
    years$ = this.store.select(
        CategoriesStoreSelectors.selectAllFilteredCategoryYears
    );

    constructor(
        private listViewFacade: CategoryListSettingsFacade,
        private store: Store
    ) {}

    onToggleThumbnailSize(newSize: ThumbnailSize): void {
        this.listViewFacade.saveThumbnailSize(newSize);
    }

    onToggleMargins(newMargin: Margin): void {
        this.listViewFacade.saveMargin(newMargin);
    }

    categoriesForYear(year: number): Observable<Category[]> {
        return this.store.select(
            CategoriesStoreSelectors.selectAllFilteredCategoriesForYear,
            { year }
        );
    }
}
