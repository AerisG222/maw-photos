import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
    @Input() hideOnMobile = false;
    @Input() icon: string | null = null;
    @Input() iconClass: string | null = null;
    @Input() routerLink: string[] | null = null;
    @Input() tooltip: string | null = null;
}
