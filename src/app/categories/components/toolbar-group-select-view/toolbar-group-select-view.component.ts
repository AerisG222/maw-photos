import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoriesStoreSelectors } from '../../store';
import { CategoryTypeFilter, RouteHelper } from '@models';

@Component({
    selector: 'app-toolbar-group-select-view',
    templateUrl: './toolbar-group-select-view.component.html',
    styleUrls: ['./toolbar-group-select-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarGroupSelectViewComponent {
    queryParams$ = combineLatest([
        this.store.select(CategoriesStoreSelectors.categoryEffectiveTypeFilter),
        this.store.select(CategoriesStoreSelectors.categoryEffectiveYearFilter)
    ]).pipe(
        map(([type, year]) => {
            return {
                type: type as CategoryTypeFilter,
                year
            };
        })
    );

    constructor(private store: Store, private sanitizer: DomSanitizer) {}
}
