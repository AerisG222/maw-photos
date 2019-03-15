import { Component, EventEmitter, Output, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatButton } from '@angular/material';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-move-previous-button',
    templateUrl: './move-previous-button.component.html',
    styleUrls: ['./move-previous-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovePreviousButtonComponent implements CanRipple {
    @Input() atStartOfList = true;
    @Output() movePrevious = new EventEmitter<void>();

    @ViewChild('prevButton') prevButton: MatButton;

    onMovePrevious(): void {
        this.movePrevious.emit();
    }

    triggerRipple(): void {
        if (!this.prevButton.disabled) {
            this.prevButton.ripple.launch({ centered: true });
        }
    }
}
