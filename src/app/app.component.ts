import { Component, Inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Theme } from '@models';
import { HotkeyHelperService } from './core/services/hotkey-helper.service';
import { HotkeyDialogComponent } from './shared/hotkey-dialog/hotkey-dialog.component';
import { AppSettingsFacade } from '@core/facades/settings/settings-facades';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    constructor(
        private hotkeysService: HotkeysService,
        private hotkeyHelper: HotkeyHelperService,
        private dialog: MatDialog,
        private appSettingsFacade: AppSettingsFacade,
        @Inject(DOCUMENT) private doc: Document
    ) {

    }

    ngOnInit(): void {
        this.hotkeysService.add(
            new Hotkey('?', (event: KeyboardEvent) => this.onHotkeyHelp(event), [], 'Show Help')
        );

        this.destroySub.add(this.appSettingsFacade.settings$
            .subscribe({
                next: appSettings => this.applyTheme(appSettings.theme)
            })
        );
    }

    ngOnDestroy(): void {
        this.hotkeysService.reset();
        this.destroySub.unsubscribe();
    }

    private applyTheme(theme: Theme): void {
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
