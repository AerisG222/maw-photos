import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StatDetail } from '../models/stat-detail.model';

@Component({
    selector: 'app-stat-detail-card',
    templateUrl: './stat-detail-card.component.html',
    styleUrls: ['./stat-detail-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatDetailCardComponent {
    @Input() title: string;
    @Input() details: StatDetail[];
}
