import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-move-previous-button',
    templateUrl: './toolbar-move-previous-button.component.html',
    styleUrls: ['./toolbar-move-previous-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarMovePreviousButtonComponent {
    @Input() atStartOfList = true;
    @Output() movePrevious = new EventEmitter<void>();

    onMovePrevious(): void {
        this.movePrevious.emit();
    }
}
