import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatLegacyButton as MatButton } from '@angular/material/legacy-button';
import { HotkeysService } from 'angular2-hotkeys';
import { ButtonLinkBaseComponent } from '../button-link-base/button-link-base.component';

@Component({
    selector: 'app-toolbar-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent
    extends ButtonLinkBaseComponent
    implements OnInit, OnDestroy {
    @Input() link: string[] | null = null;
    @Input() query = {};

    @ViewChild('linkElement') button: MatButton | null = null;

    constructor(public hotkeysService: HotkeysService) {
        super(hotkeysService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
