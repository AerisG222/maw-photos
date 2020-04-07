import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar-external-link',
    templateUrl: './toolbar-external-link.component.html',
    styleUrls: ['./toolbar-external-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarExternalLinkComponent {
    @Input() hideOnMobile = false;
    @Input() icon: string;
    @Input() iconClass: string;
    @Input() link: string;
    @Input() tooltip: string;
}
