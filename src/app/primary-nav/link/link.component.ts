import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-primary-nav-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
    @Input() icon?: string;
    @Input() routerLink?: string[];
    @Input() tooltip?: string;
}
