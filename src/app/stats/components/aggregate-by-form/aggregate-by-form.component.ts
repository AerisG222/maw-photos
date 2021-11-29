import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-aggregate-by-form',
    templateUrl: './aggregate-by-form.component.html',
    styleUrls: ['./aggregate-by-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggregateByFormComponent {
    @Input() includeDuration = false;
    @Output() selectAggregateBy = new EventEmitter<string>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            aggregateBy: ['count'],
        });

        this.form.get('aggregateBy')?.valueChanges.subscribe({
            next: (val) => this.selectAggregateBy.next(val as string | undefined),
        });
    }
}
