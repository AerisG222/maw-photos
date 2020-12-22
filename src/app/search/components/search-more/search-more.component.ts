import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
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
    private query: string | null = null;

    constructor(
        private store: Store,
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store
            .select(SearchStoreSelectors.selectSearchQuery)
            .pipe(
                tap(q => this.query = q)
            ).subscribe()
        );

        this.destroySub.add(this.store
            .select(SearchStoreSelectors.selectSearchCurrentResult)
            .pipe(
                tap(result => this.nextIndex = !!result ? result.startIndex + result.results.length : -1)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSearchMore(): void {
        if (this.nextIndex > 0) {
            this.store.dispatch(queryRequest({ query: this.query as string, start: this.nextIndex }));
        }
    }
}
