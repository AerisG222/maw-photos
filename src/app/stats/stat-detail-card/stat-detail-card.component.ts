import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-stat-detail-card',
    templateUrl: './stat-detail-card.component.html',
    styleUrls: ['./stat-detail-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatDetailCardComponent {
    @Input() title: string;
    @Input() yearCount: number;
    @Input() categoryCount: number;
    @Input() photoCount: number;
}
