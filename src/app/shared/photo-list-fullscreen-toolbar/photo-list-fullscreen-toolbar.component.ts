import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { LayoutStoreActions, PhotoStoreActions, RootStoreState } from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-list-fullscreen-toolbar',
    templateUrl: './photo-list-fullscreen-toolbar.component.html',
    styleUrls: ['./photo-list-fullscreen-toolbar.component.scss']
})
export class PhotoListFullscreenToolbarComponent implements OnInit, OnDestroy {
    private _hotkeys: Hotkey[] = [];

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('f', (evt: KeyboardEvent) => this.onHotkeyExitFullscreen(evt))
        ));
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
    }

    onExitFullscreen(): void {
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this._store$.dispatch(new PhotoStoreActions.ExitFullscreenRequestAction());
    }

    onHotkeyExitFullscreen(evt: KeyboardEvent): boolean {
        this.onExitFullscreen();

        return false;
    }
}
