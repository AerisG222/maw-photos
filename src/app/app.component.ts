import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Theme } from './core/models/theme.model';
import { LayoutStoreSelectors, RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from './core/root-store';
import { HotkeyHelperService } from './core/services/hotkey-helper.service';
import { HotkeyDialogComponent } from './shared/hotkey-dialog/hotkey-dialog.component';

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
        private _hotkeysService: HotkeysService,
        private _hotkeyHelper: HotkeyHelperService,
        private _dialog: MatDialog,
        private _store$: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private _doc
    ) {

    }

    ngOnInit(): void {
        this._hotkeysService.add(
            new Hotkey('?', (event: KeyboardEvent) => this.onHotkeyHelp(event), [], 'Show Help')
        );

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
        this._hotkeysService.reset();
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

    private onHotkeyHelp(evt: KeyboardEvent): boolean {
        this._hotkeyHelper.pauseAll();

        const dialogRef = this._dialog.open(HotkeyDialogComponent, {
            width: '800px'
        });

        dialogRef
            .afterClosed()
            .subscribe(x => {
                console.log('a');
                this._hotkeyHelper.unpauseAll();
            });

        return false;
    }
}
