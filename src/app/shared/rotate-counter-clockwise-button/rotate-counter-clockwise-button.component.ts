import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { RootStoreState, PhotoStoreActions } from 'src/app/core/root-store';

@Component({
  selector: 'app-rotate-counter-clockwise-button',
  templateUrl: './rotate-counter-clockwise-button.component.html',
  styleUrls: ['./rotate-counter-clockwise-button.component.scss']
})
export class RotateCounterClockwiseButtonComponent implements OnInit {
    private hotkeys: Hotkey[] = [];

    @ViewChild('rotateCounterClockwiseButton', {static: false}) rotateCounterClockwiseButton: MatButton;

    constructor(
        private store$: Store<RootStoreState.State>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();
    }
r
    onRotateCounterClockwise(): void {
        this.store$.dispatch(new PhotoStoreActions.RotateCounterClockwiseRequestAction());
    }

    private configureHotkeys(): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('a', (event: KeyboardEvent) => this.onHotkeyRotateCounterClockwise(event), [], 'Rotate Counter Clockwise')
        ) as Hotkey);
    }

    private onHotkeyRotateCounterClockwise(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.rotateCounterClockwiseButton);
        this.onRotateCounterClockwise();

        return false;
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
