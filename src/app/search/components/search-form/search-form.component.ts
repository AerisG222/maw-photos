import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { queryRequest } from 'src/app/search/store/actions';
import { SearchStoreSelectors } from '../../store';

@Component({
    selector: 'app-search-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
    form: UntypedFormGroup;

    constructor(private store: Store, private formBuilder: UntypedFormBuilder) {
        this.form = this.formBuilder.group({
            query: ['', Validators.required],
        });

        this.store.select(SearchStoreSelectors.selectQuery).pipe(
            first(),
        ).subscribe({
            next: (query) => {
                this.form.patchValue({ query });
            }
        });
    }

    onSearch(): void {
        const control = this.form.get('query');

        if (control) {
            const searchTerm = control.value as string;

            if (searchTerm) {
                this.store.dispatch(
                    queryRequest({ query: searchTerm, start: 0 })
                );
            }
        }
    }
}
