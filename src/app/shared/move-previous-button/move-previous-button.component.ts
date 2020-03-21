import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-move-previous-button',
    templateUrl: './move-previous-button.component.html',
    styleUrls: ['./move-previous-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovePreviousButtonComponent {
    @Input() atStartOfList = true;
    @Output() movePrevious = new EventEmitter<void>();

    onMovePrevious(): void {
        this.movePrevious.emit();
    }
}
