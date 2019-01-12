import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { IAboutInfo } from './iabout-info.model';

@Component({
    selector: 'app-about-dialog',
    templateUrl: './about-dialog.component.html',
    styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent {
    constructor(
        private _dialogRef: MatDialogRef<AboutDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public info: IAboutInfo
    ) {

    }

    onClose(): void {
        this._dialogRef.close();
    }
}
