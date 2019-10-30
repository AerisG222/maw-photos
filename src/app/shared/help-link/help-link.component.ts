import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-help-link',
  templateUrl: './help-link.component.html',
  styleUrls: ['./help-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpLinkComponent {
    @Input() tooltipPosition = 'after';
}
