import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar-external-link',
    templateUrl: './external-link.component.html',
    styleUrls: ['./external-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalLinkComponent {
    @Input() hideOnMobile = false;
    @Input() icon: string | null = null;
    @Input() iconClass: string | null = null;
    @Input() link: string | null = null;
    @Input() tooltip: string | null = null;
}
