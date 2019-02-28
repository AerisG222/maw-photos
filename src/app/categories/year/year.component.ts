import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Settings } from 'src/app/core/models/settings.model';
import { RootStoreState, SettingsStoreSelectors, RootStoreSelectors } from 'src/app/core/root-store';
import { Category } from 'src/app/core/models/category.model';

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
                select(RootStoreSelectors.selectCombinedCategoriesForYear, { year: this.year })
            );
    }
}
