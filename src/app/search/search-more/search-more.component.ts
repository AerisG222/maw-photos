import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { queryRequest } from 'src/app/core/root-store/search-store/actions';
import { selectSearchCurrentResult, selectSearchQuery } from 'src/app/core/root-store/search-store/selectors';

@Component({
    selector: 'app-search-more',
    templateUrl: './search-more.component.html',
    styleUrls: ['./search-more.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchMoreComponent implements OnInit, OnDestroy {
    private readonly destroySub = new Subscription();
    private nextIndex = -1;
    private query: string;

    constructor(
        private store$: Store<{}>,
    ) {

    }

    ngOnInit() {
        this.destroySub.add(this.store$
            .pipe(
                select(selectSearchQuery),
                tap(q => this.query = q)
            ).subscribe()
        );

        this.destroySub.add(this.store$
            .pipe(
                select(selectSearchCurrentResult),
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
