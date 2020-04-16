import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { LayoutStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-sidebar-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
    hidePanel$: Observable<boolean>;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit() {
        this.hidePanel$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsFullscreen)
            );
    }
}
