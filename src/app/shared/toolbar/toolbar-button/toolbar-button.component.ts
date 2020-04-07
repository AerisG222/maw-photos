import { Component, OnInit, ViewChild, Input, OnDestroy, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
    selector: 'app-toolbar-button',
    templateUrl: './toolbar-button.component.html',
    styleUrls: ['./toolbar-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarButtonComponent implements OnInit, OnDestroy {
    private hotkey: Hotkey;

    @Input() hideOnMobile = false;
    @Input() icon: string;
    @Input() iconRotate: number;
    @Input() isDisabled: boolean;
    @Input() shortcutKey: string;
    @Input() shortcutHelp: string;
    @Input() tooltip: string;

    @ViewChild('button') button: MatButton;

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
        if (!this.button.disabled) {
            this.button.ripple.launch({ centered: true });
        }
    }
}
