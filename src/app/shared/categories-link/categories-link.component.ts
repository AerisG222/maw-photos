import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-categories-link',
  templateUrl: './categories-link.component.html',
  styleUrls: ['./categories-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesLinkComponent {
    @Input() tooltipPosition = 'after';
}
