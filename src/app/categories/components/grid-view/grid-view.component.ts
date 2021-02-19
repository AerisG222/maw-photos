import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CategoryGridSettingsFacade } from '@core/facades/settings/category-grid-settings-facade';
import { Category, Margin, ThumbnailSize } from '@models';
import { CategoriesStoreSelectors } from '../../store';

@Component({
    selector: 'app-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent {
    gridSettings$ = this.gridViewFacade.settings$;
    years$ = this.store.select(
        CategoriesStoreSelectors.allFilteredCategoryYears
    );

    constructor(
        private gridViewFacade: CategoryGridSettingsFacade,
        private store: Store
    ) {}

    onToggleThumbnailSize(newSize: ThumbnailSize): void {
        this.gridViewFacade.saveThumbnailSize(newSize);
    }

    onToggleMargins(newMargin: Margin): void {
        this.gridViewFacade.saveMargin(newMargin);
    }

    onToggleShowTitle(doShow: boolean): void {
        this.gridViewFacade.saveShowTitles(doShow);
    }

    categoriesForYear(year: number): Observable<Category[]> {
        return this.store.select(
            CategoriesStoreSelectors.allFilteredCategoriesForYear,
            { year }
        );
    }
}
