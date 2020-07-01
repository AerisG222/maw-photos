import { Component, ChangeDetectionStrategy, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-sidebar-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnDestroy {
    private hotkey?: Hotkey;

    @Input() icon?: string;
    @Input() isActive?: boolean;
    @Input() isDisabled?: boolean;
    @Input() shortcutKey?: string;
    @Input() shortcutHelp?: string;
    @Input() tooltip?: string;

    @ViewChild('button') button?: MatButton;

    constructor(
        private hotkeysService: HotkeysService,
        private el: ElementRef
    ) {

    }

    ngOnInit(): void {
        if (!!this.shortcutKey) {
            this.hotkey = new Hotkey(this.shortcutKey, (event: KeyboardEvent) => this.onHotkeyTriggered(event), [], this.shortcutHelp);

            this.hotkeysService.add(this.hotkey);
        }
    }

    ngOnDestroy(): void {
        if (!!this.hotkey) {
            this.hotkeysService.remove(this.hotkey);
        }
    }

    onHotkeyTriggered(event: KeyboardEvent): boolean {
        this.triggerRipple();
        this.el.nativeElement.click();

        return false;
    }

    triggerRipple(): void {
        if (!!this.button && !this.button.disabled) {
            this.button.ripple.launch({ centered: true });
        }
    }
}
