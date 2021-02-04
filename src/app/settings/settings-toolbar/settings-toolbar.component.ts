import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-settings-toolbar',
  templateUrl: './settings-toolbar.component.html',
  styleUrls: ['./settings-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
