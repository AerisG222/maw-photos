import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '../../core/models/category.model';
import { Settings } from '../../core/models/settings.model';
import { RootStoreState, SettingsStoreSelectors, PhotoCategoryStoreSelectors } from '../../core/root-store';

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
    @Input() year: number;
    categories$: Observable<Category[]>;
    settings$: Observable<Settings>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.categories$ = this._store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCategoriesForYear(this.year)),
                map(categories => categories.sort(this.categoriesDescending))
            );
    }

    private categoriesDescending(first: Category, second: Category) {
        return second.id - first.id;
    }
}
