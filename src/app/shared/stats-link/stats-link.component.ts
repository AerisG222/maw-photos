import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-stats-link',
  templateUrl: './stats-link.component.html',
  styleUrls: ['./stats-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
