import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, withLatestFrom } from 'rxjs/operators';

import { queryRequest } from 'src/app/search/store/actions';
import { SearchStoreSelectors } from 'src/app/search/store';

@Component({
    selector: 'app-search-search-more',
    templateUrl: './search-more.component.html',
    styleUrls: ['./search-more.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMoreComponent {
    constructor(private store: Store) {}

    onSearchMore(): void {
        this.store
            .select(SearchStoreSelectors.selectQuery)
            .pipe(
                withLatestFrom(
                    this.store.select(SearchStoreSelectors.selectNextResultIndex)
                ),
                first()
            )
            .subscribe({
                next: ([query, nextIndex]) => {
                    if (nextIndex > 0) {
                        this.store.dispatch(
                            queryRequest({
                                query: query as string,
                                start: nextIndex,
                            })
                        );
                    }
                },
                error: () => console.log('error searching for more results'),
            });
    }
}
