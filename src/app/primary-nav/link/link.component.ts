import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-primary-nav-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
    @Input() icon: string | null = null;
    @Input() link: string[] | null = null;
    @Input() tooltip: string | null = null;
    @Input() forceActive: boolean | null = null;
}
