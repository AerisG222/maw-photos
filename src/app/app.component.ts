import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

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
    startSidenavExpanded = false;
    endSidenavExpanded = false;
    isRightSidebarDisplayed$: Observable<boolean>;

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
            .subscribe(settings => this.setTheme(settings.theme));

        this.isRightSidebarDisplayed$ = this._store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsRightSidebarDisplayed)
            );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }

    toggleStartSidenav(): void {
        this.startSidenavExpanded = !this.startSidenavExpanded;
    }

    toggleEndSidenav(): void {
        this.endSidenavExpanded = !this.endSidenavExpanded;
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
