import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';

import { MatButton } from '@angular/material';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-move-next-button',
    templateUrl: './move-next-button.component.html',
    styleUrls: ['./move-next-button.component.scss']
})
export class MoveNextButtonComponent implements CanRipple {
    @Input() atEndOfList = false;
    @Output() moveNext = new EventEmitter<void>();

    @ViewChild('nextButton') nextButton: MatButton;

    onMoveNext(): void {
        this.moveNext.emit();
    }

    triggerRipple(): void {
        if (!this.nextButton.disabled) {
            this.nextButton.ripple.launch({ centered: true });
        }
    }
}
