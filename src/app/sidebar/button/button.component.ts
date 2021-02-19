import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-sidebar-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnDestroy {
    @Input() icon: string | null = null;
    @Input() isActive: boolean | null = null;
    @Input() isDisabled: boolean | null = null;
    @Input() shortcutKey: string | null = null;
    @Input() shortcutHelp: string | null = null;
    @Input() tooltip: string | null = null;

    @ViewChild('button') button: MatButton | null = null;

    private hotkey: Hotkey | null = null;

    constructor(
        private hotkeysService: HotkeysService,
        private el: ElementRef
    ) {}

    ngOnInit(): void {
        if (this.shortcutKey) {
            this.hotkey = new Hotkey(
                this.shortcutKey,
                () => this.onHotkeyTriggered(),
                [],
                this.shortcutHelp ?? undefined
            );

            this.hotkeysService.add(this.hotkey);
        }
    }

    ngOnDestroy(): void {
        if (this.hotkey) {
            this.hotkeysService.remove(this.hotkey);
        }
    }

    onHotkeyTriggered(): boolean {
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
