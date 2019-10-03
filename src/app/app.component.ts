import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { OidcFacade } from 'ng-oidc-client';

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
    private destroySub = new Subscription();

    showRightSidebar$: Observable<boolean>;
    hidePanels$: Observable<boolean>;

    constructor(
        private hotkeysService: HotkeysService,
        private hotkeyHelper: HotkeyHelperService,
        private dialog: MatDialog,
        private store$: Store<RootStoreState.State>,
        private oidcFacade: OidcFacade,
        @Inject(DOCUMENT) private doc
    ) {

    }

    ngOnInit(): void {
        this.oidcFacade.getOidcUser();

        this.showRightSidebar$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectShowRightSidebar)
            );

        this.hidePanels$ = this.store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsFullscreen)
            );

        this.hotkeysService.add(
            new Hotkey('?', (event: KeyboardEvent) => this.onHotkeyHelp(event), [], 'Show Help')
        );

        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            )
            .subscribe(settings => this.setTheme(settings.appTheme))
        );

        this.store$.dispatch(new SettingsStoreActions.LoadRequestAction());
    }

    ngOnDestroy(): void {
        this.hotkeysService.reset();
        this.destroySub.unsubscribe();
    }

    private setTheme(theme: Theme): void {
        const classList: DOMTokenList = this.doc.documentElement.classList;

        if (!classList.contains('mat-app-background')) {
            classList.add('mat-app-background');
        }

        Theme.allThemes.forEach(x => {
            classList.remove(x.klass);
        });

        classList.add(theme.klass);
    }

    private onHotkeyHelp(evt: KeyboardEvent): boolean {
        this.hotkeyHelper.pauseAll();

        const dialogRef = this.dialog.open(HotkeyDialogComponent, {
            width: '800px'
        });

        this.destroySub.add(dialogRef
            .afterClosed()
            .subscribe(x => {
                this.hotkeyHelper.unpauseAll();
            })
        );

        return false;
    }
}
