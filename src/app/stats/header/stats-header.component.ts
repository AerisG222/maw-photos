import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-stats-header',
    templateUrl: './stats-header.component.html',
    styleUrls: ['./stats-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsHeaderComponent {
    @Input() title: string;
    @Input() year: number;
    @Output() clickYear = new EventEmitter<void>();

    onBack(): void {
        this.clickYear.emit();
    }
}
