import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { toolbarShow } from '@shared/animations';

@Component({
    selector: 'app-layout-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [useAnimation(toolbarShow)]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @ViewChild('scrollPane')
    scrollPane: ElementRef<HTMLDivElement> | null = null;

    getCurrentScrollTop(): number {
        if (this.scrollPane) {
            return this.scrollPane.nativeElement.scrollTop;
        }

        return 0;
    }

    setCurrentScrollTop(newTop: number): void {
        if (this.scrollPane) {
            const div = this.scrollPane.nativeElement;
            setTimeout(() => div.scrollTop = newTop);
        }
    }
}
