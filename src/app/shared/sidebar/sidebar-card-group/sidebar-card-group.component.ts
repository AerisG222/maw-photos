import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sidebar-card-group',
    templateUrl: './sidebar-card-group.component.html',
    styleUrls: ['./sidebar-card-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCardGroupComponent {
    @HostBinding('class.mat-elevation-z4') get() { return true; }
}
