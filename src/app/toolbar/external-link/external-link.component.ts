import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar-external-link',
    templateUrl: './external-link.component.html',
    styleUrls: ['./external-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalLinkComponent {
    @Input() hideOnMobile = false;
    @Input() icon: string;
    @Input() iconClass: string;
    @Input() link: string;
    @Input() tooltip: string;
}