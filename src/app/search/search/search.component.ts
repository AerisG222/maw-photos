import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { toolbarShow } from 'src/app/shared/animations';
import { queryRequest } from 'src/app/core/root-store/search-store/actions';
import { SearchResult } from 'src/app/core/models/search/search-result.model';
import { MultimediaCategory } from 'src/app/core/models/search/multimedia-category.model';
import { Observable } from 'rxjs';
import { selectSearchAllResults, selectSearchCurrentResult } from 'src/app/core/root-store/search-store/selectors';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ]
})
export class SearchComponent implements OnInit {
    form: FormGroup;
    currentResult$: Observable<SearchResult<MultimediaCategory>>;
    categories$: Observable<MultimediaCategory[]>;

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            query: ['', Validators.required]
        });

        this.currentResult$ = this.store$.select(selectSearchCurrentResult);
        this.categories$ = this.store$
            .select(selectSearchAllResults)
            .pipe(
                tap(r => console.table(r))
            );
    }

    onSearch() {
        const searchTerm = this.form.get('query').value;

        this.store$.dispatch(queryRequest({ query: searchTerm }));
    }
}
