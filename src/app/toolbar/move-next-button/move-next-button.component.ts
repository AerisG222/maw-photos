import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-toolbar-move-next-button',
    templateUrl: './move-next-button.component.html',
    styleUrls: ['./move-next-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveNextButtonComponent {
    @Input() atEndOfList = false;
    @Output() moveNext = new EventEmitter<void>();

    onMoveNext(): void {
        this.moveNext.emit();
    }
}
