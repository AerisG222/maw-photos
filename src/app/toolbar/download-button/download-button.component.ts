import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-toolbar-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadButtonComponent {
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
