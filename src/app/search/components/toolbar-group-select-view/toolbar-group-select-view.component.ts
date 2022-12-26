import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { SearchStoreSelectors } from '../../store';

@Component({
    selector: 'app-toolbar-group-select-view',
    templateUrl: './toolbar-group-select-view.component.html',
    styleUrls: ['./toolbar-group-select-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarGroupSelectViewComponent {
    queryParams$ = this.store.select(SearchStoreSelectors.selectQuery)
        .pipe(
            // eslint-disable-next-line ngrx/avoid-mapping-selectors
            map((s) => ({ s }))
        );

    constructor(private store: Store) {}
}
