import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { LayoutStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-sidebar-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
    hidePanel$: Observable<boolean> | null = null;

    constructor(
        private store: Store
    ) {

    }

    ngOnInit(): void {
        this.hidePanel$ = this.store.select(LayoutStoreSelectors.selectLayoutIsFullscreen);
    }
}
