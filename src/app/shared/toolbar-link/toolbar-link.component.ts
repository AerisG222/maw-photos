import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar-link',
    templateUrl: './toolbar-link.component.html',
    styleUrls: ['./toolbar-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarLinkComponent {
    @Input() hideOnMobile = false;
    @Input() icon: string;
    @Input() iconClass: string;
    @Input() routerLink: string[];
    @Input() tooltip: string;
}
