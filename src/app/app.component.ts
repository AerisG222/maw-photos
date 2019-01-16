import { Component, HostBinding, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { Theme } from './models/theme.model';
import { RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from './root-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    themeSubscription: Subscription;

    title = 'maw-photos';
    startSidenavExpanded = false;
    endSidenavExpanded = false;

    constructor(
        public dialog: MatDialog,
        private _store$: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private _doc
    ) {

    }

    ngOnInit(): void {
        this.themeSubscription = this._store$
            .select(
                SettingsStoreSelectors.selectSettings
            )
            .pipe(
                map(settings => {
                    this.setTheme(settings.theme);
                })
            )
            .subscribe();

        this._store$.dispatch(
            new SettingsStoreActions.LoadRequestAction()
        );
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

    showHelp(): void {
        this.dialog.open(HelpDialogComponent, {
            width: '500px',
            data: { version: '0.1.0' }
        });
    }

    showSettings(): void {
        this.dialog.open(SettingsDialogComponent, {
            width: '500px'
        });
    }

    private setTheme(theme: Theme): void {
        const classList: DOMTokenList = this._doc.documentElement.classList;

        if (!classList.contains('mat-app-background')) {
            classList.add('mat-app-background');
        }

        Theme.ALL_THEMES.forEach(x => {
            classList.remove(x.klass);
        });

        classList.add(theme.klass);
    }
}
