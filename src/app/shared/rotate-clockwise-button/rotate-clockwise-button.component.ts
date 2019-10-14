import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

import { RootStoreState, PhotoStoreActions } from 'src/app/core/root-store';

@Component({
  selector: 'app-rotate-clockwise-button',
  templateUrl: './rotate-clockwise-button.component.html',
  styleUrls: ['./rotate-clockwise-button.component.scss']
})
export class RotateClockwiseButtonComponent implements OnInit {
    private hotkeys: Hotkey[] = [];

    @ViewChild('rotateClockwiseButton', {static: false}) rotateClockwiseButton: MatButton;

    constructor(
        private store$: Store<RootStoreState.State>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();
    }

    onRotateClockwise(): void {
        this.store$.dispatch(PhotoStoreActions.rotateClockwiseRequest());
    }

    private configureHotkeys(): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('d', (event: KeyboardEvent) => this.onHotkeyRotateClockwise(event), [], 'Rotate Clockwise')
        ) as Hotkey);
    }

    private onHotkeyRotateClockwise(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.rotateClockwiseButton);
        this.onRotateClockwise();

        return false;
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
