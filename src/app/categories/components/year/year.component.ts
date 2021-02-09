import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-categories-year',
    templateUrl: './year.component.html',
    styleUrls: ['./year.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearComponent {
    @Input() year: number | null = null;
}
