import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { queryNextPageRequest } from 'src/app/core/root-store/search-store/actions';
import { selectSearchCurrentResult } from 'src/app/core/root-store/search-store/selectors';

@Component({
    selector: 'app-search-more',
    templateUrl: './search-more.component.html',
    styleUrls: ['./search-more.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchMoreComponent implements OnInit, OnDestroy {
    private readonly destroySub = new Subscription();
    private nextIndex = -1;

    constructor(
        private store$: Store<{}>,
    ) {

    }

    ngOnInit() {
        this.destroySub.add(this.store$
            .pipe(
                select(selectSearchCurrentResult),
                map(result => result.startIndex + result.results.length),
                tap(idx => this.nextIndex = idx)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSearchMore() {
        if (this.nextIndex > 0) {
            this.store$.dispatch(queryNextPageRequest({ start: this.nextIndex }));
        }
    }
}
