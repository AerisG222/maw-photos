import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';

import { LayoutStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-primary-nav-primary-nav',
    templateUrl: './primary-nav.component.html',
    styleUrls: ['./primary-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryNavComponent implements OnInit {
    hideNav$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.hideNav$ = this.store
            .select(LayoutStoreSelectors.selectLayoutIsFullscreen)
            .pipe(
                delay(0)
            );
    }
}
