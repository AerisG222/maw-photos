import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-random-link',
  templateUrl: './random-link.component.html',
  styleUrls: ['./random-link.component.scss']
})
export class RandomLinkComponent {
    @Input() tooltipPosition = 'after';
}
