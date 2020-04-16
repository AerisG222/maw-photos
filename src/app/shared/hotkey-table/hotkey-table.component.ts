import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-shared-hotkey-table',
  templateUrl: './hotkey-table.component.html',
  styleUrls: ['./hotkey-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotkeyTableComponent {
    @Input() hotkeys: Hotkey[];

    columnsToDisplay = ['formatted', 'description'];
}
