import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { queryRequest } from 'src/app/search/store/actions';

@Component({
    selector: 'app-search-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
    form: FormGroup;

    constructor(
        private store: Store,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            query: ['', Validators.required]
        });
    }

    onSearch(): void {
        const control = this.form.get('query');

        if (!!control) {
            const searchTerm = control.value;

            if (!!searchTerm) {
                this.store.dispatch(queryRequest({ query: searchTerm, start: 0 }));
            }
        }
    }
}
