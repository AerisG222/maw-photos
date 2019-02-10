import { Injectable } from '@angular/core';
import { HotkeysService } from 'angular2-hotkeys';

@Injectable({
    providedIn: 'root'
})
export class HotkeyHelperService {
    // https://github.com/brtnshrdr/angular2-hotkeys/issues/101
    constructor(
        private _hotkeyService: HotkeysService
    ) { }

    pauseAll() {
        // shallow copy because the native pause() is bugged
        const copy = this._hotkeyService.hotkeys.slice(0);

        for (const hk of copy) {
            // exclude cheat-sheet
            if (hk.combo !== '?') {
                this._hotkeyService.pause(hk);
            }
        }
    }

    unpauseAll() {
        // shallow copy because the native unpause() is bugged
        const copy = this._hotkeyService.pausedHotkeys.slice(0);

        for (const hk of copy) {
            this._hotkeyService.unpause(hk);
        }
    }
}
