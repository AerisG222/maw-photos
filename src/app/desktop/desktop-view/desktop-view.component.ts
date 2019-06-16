import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { RootStoreState, LayoutStoreSelectors } from 'src/app/core/root-store';

@Component({
    selector: 'app-desktop-view',
    templateUrl: './desktop-view.component.html',
    styleUrls: ['./desktop-view.component.scss']
})
export class DesktopViewComponent implements OnInit {
    @Input() routerTemplate: TemplateRef<any>;

    isRightSidebarDisplayed$: Observable<boolean>;
    hidePanels$: Observable<boolean>;

    constructor(
        private store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.isRightSidebarDisplayed$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsRightSidebarDisplayed),
                delay(0)
            );

        this.hidePanels$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsFullscreen),
                delay(0)
            );
    }
}
