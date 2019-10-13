import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { delay } from 'rxjs/operators';

import { RootStoreState, LayoutStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-primary-nav',
    templateUrl: './primary-nav.component.html',
    styleUrls: ['./primary-nav.component.scss']
})
export class PrimaryNavComponent implements OnInit {
    hideNav$: Observable<boolean>;

    constructor(
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.hideNav$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsFullscreen),
                delay(0)
            );
    }
}
