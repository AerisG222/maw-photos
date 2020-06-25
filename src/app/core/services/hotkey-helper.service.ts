import { Injectable } from '@angular/core';
import { HotkeysService } from 'angular2-hotkeys';

@Injectable({
    providedIn: 'root'
})
export class HotkeyHelperService {
    // https://github.com/brtnshrdr/angular2-hotkeys/issues/101
    constructor(
        private hotkeyService: HotkeysService
    ) { }

    pauseAll(): void {
        // shallow copy because the native pause() is bugged
        const copy = this.hotkeyService.hotkeys.slice(0);

        for (const hk of copy) {
            // exclude cheat-sheet
            if (hk.combo !== '?') {
                this.hotkeyService.pause(hk);
            }
        }
    }

    unpauseAll(): void {
        // shallow copy because the native unpause() is bugged
        const copy = this.hotkeyService.pausedHotkeys.slice(0);

        for (const hk of copy) {
            this.hotkeyService.unpause(hk);
        }
    }
}
