import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { queryRequest } from 'src/app/search/store/actions';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
    form: FormGroup;

    constructor(
        private store$: Store,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            query: ['', Validators.required]
        });
    }

    onSearch() {
        const searchTerm = this.form.get('query').value;

        if (!!searchTerm) {
            this.store$.dispatch(queryRequest({ query: searchTerm, start: 0 }));
        }
    }
}
