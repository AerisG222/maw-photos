import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-categories-link',
  templateUrl: './categories-link.component.html',
  styleUrls: ['./categories-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
