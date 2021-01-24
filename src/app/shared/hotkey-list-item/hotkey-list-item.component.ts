import { Component, Input } from '@angular/core';
import { Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-hotkey-list-item',
  templateUrl: './hotkey-list-item.component.html',
  styleUrls: ['./hotkey-list-item.component.scss']
})
export class HotkeyListItemComponent {
    @Input() key: Hotkey = new Hotkey('', () => { return false; });
}
