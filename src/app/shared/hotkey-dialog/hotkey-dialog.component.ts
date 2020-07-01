import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-shared-hotkey-dialog',
    templateUrl: './hotkey-dialog.component.html',
    styleUrls: ['./hotkey-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotkeyDialogComponent implements OnInit {
    firstHotkeys?: Hotkey[];
    secondHotkeys?: Hotkey[];

    constructor(
        private dialogRef: MatDialogRef<HotkeyDialogComponent>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        const keys = [...this.hotkeysService.hotkeys, ...this.hotkeysService.pausedHotkeys];

        this.updateDisplay(keys);
    }

    onClose(): void {
        this.dialogRef.close();
    }

    updateDisplay(keys: Hotkey[]): void {
        if (!keys) {
            return;
        }

        if (keys.length <= 5) {
            this.firstHotkeys = keys;
            this.secondHotkeys = undefined;
        } else {
            const half = Math.floor(keys.length / 2);

            this.firstHotkeys = keys.slice(0, half);
            this.secondHotkeys = keys.slice(half);
        }
    }
}
