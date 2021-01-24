import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

@Component({
    selector: 'app-button-link-base',
    templateUrl: './button-link-base.component.html',
    styleUrls: ['./button-link-base.component.scss']
})
export abstract class ButtonLinkBaseComponent implements OnInit, OnDestroy {
    @Input() hideOnMobile = false;
    @Input() icon: string | null = null;
    @Input() iconClass: string | null = null;
    @Input() tooltip: string | null = null;
    @Input() isDisabled: boolean | null = null;
    @Input() shortcutKey: string | null = null;
    @Input() shortcutHelp: string | null = null;

    private hotkey: Hotkey | null = null;

    abstract button: MatButton | null = null;

    constructor(
        public hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        if (!!this.shortcutKey) {
            // eslint-disable-next-line max-len
            this.hotkey = new Hotkey(this.shortcutKey, (event: KeyboardEvent) => this.onHotkeyTriggered(event), [], this.shortcutHelp ?? undefined);

            this.hotkeysService.add(this.hotkey);
        }
    }

    ngOnDestroy(): void {
        if (!!this.hotkey) {
            this.hotkeysService.remove(this.hotkey);
        }
    }

    private onHotkeyTriggered(event: KeyboardEvent): boolean {
        if (!!this.button && !this.button.disabled) {
            this.button.ripple.launch({ centered: true });
            // eslint-disable-next-line no-underscore-dangle
            this.button._elementRef.nativeElement.click();
        }

        return false;
    }
}
