import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-link',
  templateUrl: './categories-link.component.html',
  styleUrls: ['./categories-link.component.scss']
})
export class CategoriesLinkComponent {
    @Input() tooltipPosition = 'after';
}
