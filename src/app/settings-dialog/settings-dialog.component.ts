import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-settings-dialog',
    templateUrl: './settings-dialog.component.html',
    styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent {
    constructor(
        private _dialogRef: MatDialogRef<SettingsDialogComponent>
    ) {

    }

    onClose(): void {
        this._dialogRef.close();
    }
}
