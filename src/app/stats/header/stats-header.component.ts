import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-stats-header',
    templateUrl: './stats-header.component.html',
    styleUrls: ['./stats-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsHeaderComponent {
    @Input() year: number;
}
