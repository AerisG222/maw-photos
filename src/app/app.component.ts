import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Theme } from './core/models/theme.model';
import { LayoutStoreSelectors, RootStoreState, SettingsStoreSelectors, SettingsStoreActions, LayoutStoreActions } from './core/root-store';
import { HotkeyHelperService } from './core/services/hotkey-helper.service';
import { HotkeyDialogComponent } from './shared/hotkey-dialog/hotkey-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    isMobileView$: Observable<boolean>;

    constructor(
        private _hotkeysService: HotkeysService,
        private _hotkeyHelper: HotkeyHelperService,
        private _dialog: MatDialog,
        private _store$: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private _doc
    ) {

    }

    ngOnInit(): void {
        this._store$.dispatch(new LayoutStoreActions.InitializeRequestAction());

        this.isMobileView$ = this._store$.pipe(
            select(LayoutStoreSelectors.selectLayoutIsMobileView)
        );

        this._hotkeysService.add(
            new Hotkey('?', (event: KeyboardEvent) => this.onHotkeyHelp(event), [], 'Show Help')
        );

        this.destroySub.add(this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            )
            .subscribe(settings => this.setTheme(settings.appTheme))
        );

        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
    }

    ngOnDestroy(): void {
        this._hotkeysService.reset();
        this.destroySub.unsubscribe();
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

        this.destroySub.add(dialogRef
            .afterClosed()
            .subscribe(x => {
                this._hotkeyHelper.unpauseAll();
            })
        );

        return false;
    }
}
