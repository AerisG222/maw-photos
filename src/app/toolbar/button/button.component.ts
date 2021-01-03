import { Component, OnInit, ViewChild, Input, OnDestroy, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
    selector: 'app-toolbar-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnDestroy {
    @Input() hideOnMobile = false;
    @Input() icon: string | null = null;
    @Input() iconRotate: number | null = null;
    @Input() isDisabled: boolean | null = null;
    @Input() shortcutKey: string | null = null;
    @Input() shortcutHelp: string | null = null;
    @Input() tooltip: string | null = null;
    @Input() isActive = false;

    @ViewChild('button') button: MatButton | null = null;

    private hotkey: Hotkey | null = null;

    constructor(
        private hotkeysService: HotkeysService,
        private el: ElementRef
    ) {

    }

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
