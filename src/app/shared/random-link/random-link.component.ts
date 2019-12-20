import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-random-link',
  templateUrl: './random-link.component.html',
  styleUrls: ['./random-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
