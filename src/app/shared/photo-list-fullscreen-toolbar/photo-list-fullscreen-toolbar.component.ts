import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import {
    LayoutStoreActions,
    PhotoStoreActions,
    RootStoreState,
    SettingsStoreSelectors,
    SettingsStoreActions
} from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-list-fullscreen-toolbar',
    templateUrl: './photo-list-fullscreen-toolbar.component.html',
    styleUrls: ['./photo-list-fullscreen-toolbar.component.scss']
})
export class PhotoListFullscreenToolbarComponent implements OnInit, OnDestroy {
    isToolbarExpanded$: Observable<boolean>;

    private _hotkeys: Hotkey[] = [];

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this.isToolbarExpanded$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectPhotoListFullscreenToolbarExpandedState)
            );

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event), [], 'Move Next')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event), [], 'Move Previous')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('p', (event: KeyboardEvent) => this.onHotkeyToggleSlideshow(event), [], 'Play / Pause Slideshow')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('f', (evt: KeyboardEvent) => this.onHotkeyExitFullscreen(evt), [], 'Exit Fullscreen')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('x', (evt: KeyboardEvent) => this.onHotkeyToggleFullscreenToolbar(evt), [], 'Show / Hide Toolbar')
        ));
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
    }

    onExitFullscreen(): void {
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this._store$.dispatch(new PhotoStoreActions.ExitFullscreenRequestAction());
    }

    onMoveNext(): void {
        this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
    }

    onMovePrevious(): void {
        this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
    }

    onToggleSlideshow(): void {
        this._store$.dispatch(new PhotoStoreActions.ToggleSlideshowRequestAction());
    }

    onToggleFullscreenToolbar(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoListFullscreenToolbarExpandedStateRequestAction());
    }

    private onHotkeyExitFullscreen(evt: KeyboardEvent): boolean {
        this.onExitFullscreen();

        return false;
    }

    private onHotkeyMoveNext(evt: KeyboardEvent): boolean {
        this.onMoveNext();

        return false;
    }

    private onHotkeyMovePrevious(evt: KeyboardEvent): boolean {
        this.onMovePrevious();

        return false;
    }

    private onHotkeyToggleSlideshow(evt: KeyboardEvent): boolean {
        this.onToggleSlideshow();

        return false;
    }

    private onHotkeyToggleFullscreenToolbar(evt: KeyboardEvent): boolean {
        this.onToggleFullscreenToolbar();

        return false;
    }
}
