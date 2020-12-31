import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-photos-toolbar-download-button',
    templateUrl: './toolbar-download-button.component.html',
    styleUrls: ['./toolbar-download-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarDownloadButtonComponent {
    @Input() hideOnMobile = false;
    @Input() icon: string | null = null;
    @Input() iconClass: string | null = null;
    @Input() link: string | null = null;
    @Input() tooltip: string | null = null;

    onClick(): void {
        if (!!this.link) {
            saveAs(this.link);
        }
    }
}
