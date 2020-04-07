import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sidebar-button-group',
    templateUrl: './sidebar-button-group.component.html',
    styleUrls: ['./sidebar-button-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarButtonGroupComponent {
    @HostBinding('class.mat-elevation-z4') get() { return true; }
}
