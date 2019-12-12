import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { RootStoreState, LayoutStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
    hidePanel$: Observable<boolean>;
    showSidebar$: Observable<boolean>;

    constructor(
        private store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.showSidebar$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectShowRightSidebar)
            );

        this.hidePanel$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsFullscreen)
            );
    }
}
