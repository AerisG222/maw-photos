import { Component, Inject, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Theme } from '@models';
import { SettingsStoreSelectors, SettingsStoreActions } from './core/root-store';
import { HotkeyHelperService } from './core/services/hotkey-helper.service';
import { HotkeyDialogComponent } from './shared/hotkey-dialog/hotkey-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    private destroySub = new Subscription();

    constructor(
        private hotkeysService: HotkeysService,
        private hotkeyHelper: HotkeyHelperService,
        private dialog: MatDialog,
        private store: Store,
        private breakpointObserver: BreakpointObserver,
        @Inject(DOCUMENT) private doc: Document
    ) {

    }

    ngOnInit(): void {
        this.hotkeysService.add(
            new Hotkey('?', (event: KeyboardEvent) => this.onHotkeyHelp(event), [], 'Show Help')
        );

        this.destroySub.add(this.store
            .select(SettingsStoreSelectors.appTheme)
            .subscribe({
                next: theme => this.setTheme(theme)
            })
        );

        this.store.dispatch(SettingsStoreActions.loadRequest());
    }

    ngAfterViewInit(): void {
        if (this.breakpointObserver.isMatched('(max-width: 800px)')) {
            this.store.dispatch(SettingsStoreActions.updateMobileMarginsRequest());
        }
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
            .subscribe({
                next: x => this.hotkeyHelper.unpauseAll()
            })
        );

        return false;
    }
}
