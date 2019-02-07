import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Theme } from './core/models/theme.model';
import { RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from './core/root-store';
import { LayoutStoreSelectors } from './core/root-store/layout-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    themeSubscription: Subscription;
    isRightSidebarDisplayed$: Observable<boolean>;
    hidePanels$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private _doc
    ) {

    }

    ngOnInit(): void {
        this.themeSubscription = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            )
            .subscribe(settings => this.setTheme(settings.appTheme));

        this.isRightSidebarDisplayed$ = this._store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsRightSidebarDisplayed),
                delay(0)
            );

        this.hidePanels$ = this._store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsFullscreen),
                delay(0)
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }

    private setTheme(theme: Theme): void {
        const classList: DOMTokenList = this._doc.documentElement.classList;

        if (!classList.contains('mat-app-background')) {
            classList.add('mat-app-background');
        }

        Theme.allThemes.forEach(x => {
            classList.remove(x.klass);
        });

        classList.add(theme.klass);
    }
}
