import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-submit-buttons',
    templateUrl: './submit-buttons.component.html',
    styleUrls: ['./submit-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitButtonsComponent {
    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();
}
