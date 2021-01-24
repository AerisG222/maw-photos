import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HotkeysService } from 'angular2-hotkeys';
import { ButtonLinkBaseComponent } from '../button-link-base/button-link-base.component';

@Component({
    selector: 'app-toolbar-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends ButtonLinkBaseComponent implements OnInit, OnDestroy  {
    @Input() isActive = false;

    @ViewChild('button') button: MatButton | null = null;

    constructor(
        public hotkeysService: HotkeysService
    ) {
        super(hotkeysService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
