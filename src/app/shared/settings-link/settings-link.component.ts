import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-settings-link',
  templateUrl: './settings-link.component.html',
  styleUrls: ['./settings-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
