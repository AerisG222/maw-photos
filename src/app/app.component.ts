import { Component, HostBinding, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'maw-photos';
    startSidenavExpanded = false;
    endSidenavExpanded = false;

    @HostBinding('class.maw-dark-theme') darkTheme = true;
    @HostBinding('class.maw-light-theme') lightTheme = false;

    constructor(
        public dialog: MatDialog,
        @Inject(DOCUMENT) private _doc
        ) {
        this.updateMainBackground();
    }

    toggleTheme(): void {
        this.darkTheme = !this.darkTheme;
        this.lightTheme = !this.lightTheme;

        this.updateMainBackground();
    }

    toggleStartSidenav(): void {
        this.startSidenavExpanded = !this.startSidenavExpanded;
    }

    toggleEndSidenav(): void {
        this.endSidenavExpanded = !this.endSidenavExpanded;
    }

    updateMainBackground(): void {
        const classList: DOMTokenList = this._doc.documentElement.classList;

        if (!classList.contains('mat-app-background')) {
            classList.add('mat-app-background');
        }

        if (this.darkTheme) {
            classList.remove('maw-light-theme');
            classList.add('maw-dark-theme');
        } else {
            classList.remove('maw-dark-theme');
            classList.add('maw-light-theme');
        }
    }

    showAbout(): void {
        this.dialog.open(AboutDialogComponent, {
            width: '500px',
            data: { version: '0.1.0' }
        });
    }
}
