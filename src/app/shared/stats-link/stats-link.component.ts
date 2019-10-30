import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stats-link',
  templateUrl: './stats-link.component.html',
  styleUrls: ['./stats-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsLinkComponent {
    @Input() tooltipPosition = 'after';
}
