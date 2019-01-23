import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { Theme } from './core/models/theme.model';
import { RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from './root-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    themeSubscription: Subscription;
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
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            )
            .subscribe(settings => this.setTheme(settings.theme));

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

        Theme.allThemes.forEach(x => {
            classList.remove(x.klass);
        });

        classList.add(theme.klass);
    }
}
