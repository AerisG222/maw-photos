import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { tap, first } from 'rxjs/operators';
import { SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-categories-category-missing-gps-filter',
    templateUrl: './category-missing-gps-filter.component.html',
    styleUrls: ['./category-missing-gps-filter.component.scss']
})
export class CategoryMissingGpsFilterComponent implements OnInit {
    filterEnabled: boolean;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.store$
            .pipe(
                select(SettingsStoreSelectors.selectCategoryListMissingGpsFilter),
                tap(filter => this.filterEnabled = filter),
                first()
            )
            .subscribe();
    }

    onToggleMissingGpsData(): void {
        // tslint:disable-next-line: max-line-length
        this.store$.dispatch(SettingsStoreActions.toggleCategoryListMissingGpsFilterRequest());
    }
}
