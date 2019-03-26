import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-link',
  templateUrl: './stats-link.component.html',
  styleUrls: ['./stats-link.component.scss']
})
export class StatsLinkComponent {
    @Input() tooltipPosition = 'after';
}
