import { Component, ChangeDetectionStrategy, Input, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HotkeysService } from 'angular2-hotkeys';
import { ButtonLinkBaseComponent } from '../button-link-base/button-link-base.component';

@Component({
    selector: 'app-toolbar-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent extends ButtonLinkBaseComponent implements OnInit, OnDestroy {
    @Input() routerLink: string[] | null = null;

    @ViewChild('link') button: MatButton | null = null;

    constructor(
        public hotkeysService: HotkeysService,
        public el: ElementRef
    ) {
        super(hotkeysService, el);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
