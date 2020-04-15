import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { queryRequest } from 'src/app/search/store/actions';
import { SearchStoreSelectors } from 'src/app/search/store';

@Component({
    selector: 'app-search-search-more',
    templateUrl: './search-more.component.html',
    styleUrls: ['./search-more.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchMoreComponent implements OnInit, OnDestroy {
    private readonly destroySub = new Subscription();
    private nextIndex = -1;
    private query: string;

    constructor(
        private store$: Store,
    ) {

    }

    ngOnInit() {
        this.destroySub.add(this.store$
            .pipe(
                select(SearchStoreSelectors.selectSearchQuery),
                tap(q => this.query = q)
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(SearchStoreSelectors.selectSearchCurrentResult),
                tap(result => this.nextIndex = result.startIndex + result.results.length)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSearchMore() {
        if (this.nextIndex > 0) {
            this.store$.dispatch(queryRequest({ query: this.query, start: this.nextIndex }));
        }
    }
}
