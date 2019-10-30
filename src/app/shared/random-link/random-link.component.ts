import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-random-link',
  templateUrl: './random-link.component.html',
  styleUrls: ['./random-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomLinkComponent {
    @Input() tooltipPosition = 'after';
}
