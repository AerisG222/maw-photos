import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sidebar-card',
    templateUrl: './sidebar-card.component.html',
    styleUrls: ['./sidebar-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarCardComponent {
    @Input() icon: string;
    @Input() title: string;
}
