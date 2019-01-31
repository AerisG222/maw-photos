import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-effects',
    templateUrl: './effects.component.html',
    styleUrls: ['./effects.component.scss']
})
export class EffectsComponent {
    @Output() rotateCounterClockwise = new EventEmitter<void>();
    @Output() rotateClockwise = new EventEmitter<void>();

    onRotateCounterClockwise(): void {
        this.rotateCounterClockwise.emit();
    }

    onRotateClockwise(): void {
        this.rotateClockwise.emit();
    }
}
