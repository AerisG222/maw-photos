import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IHelpInfo } from './ihelp-info.model';

@Component({
    selector: 'app-help-dialog',
    templateUrl: './help-dialog.component.html',
    styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent {
    constructor(
        private _dialogRef: MatDialogRef<HelpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public info: IHelpInfo
    ) {

    }

    onClose(): void {
        this._dialogRef.close();
    }
}
