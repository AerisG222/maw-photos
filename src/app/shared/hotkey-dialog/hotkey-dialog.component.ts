import { Component, OnInit } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-hotkey-dialog',
    templateUrl: './hotkey-dialog.component.html',
    styleUrls: ['./hotkey-dialog.component.scss']
})
export class HotkeyDialogComponent implements OnInit {
    firstHotkeys: Hotkey[];
    secondHotkeys: Hotkey[];

    constructor(
        private _dialogRef: MatDialogRef<HotkeyDialogComponent>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        const keys = [...this._hotkeysService.hotkeys, ...this._hotkeysService.pausedHotkeys];

        this.updateDisplay(keys);
    }

    onClose() {
        this._dialogRef.close();
    }

    updateDisplay(keys: Hotkey[]): void {
        if (!keys) {
            return;
        }

        if (keys.length <= 5) {
            this.firstHotkeys = keys;
            this.secondHotkeys = null;
        } else {
            const half = Math.floor(keys.length / 2);

            this.firstHotkeys = keys.slice(0, half);
            this.secondHotkeys = keys.slice(half);
        }
    }
}
