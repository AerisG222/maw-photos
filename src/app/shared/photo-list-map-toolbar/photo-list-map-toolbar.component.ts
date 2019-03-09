import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material';
import { Store } from '@ngrx/store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { RootStoreState, PhotoStoreActions } from 'src/app/core/root-store';
import { MovePreviousButtonComponent } from '../move-previous-button/move-previous-button.component';
import { MoveNextButtonComponent } from '../move-next-button/move-next-button.component';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-photo-list-map-toolbar',
    templateUrl: './photo-list-map-toolbar.component.html',
    styleUrls: ['./photo-list-map-toolbar.component.scss']
})
export class PhotoListMapToolbarComponent implements OnInit, OnDestroy {
    @ViewChild('movePreviousButton') movePreviousButton: MovePreviousButtonComponent;
    @ViewChild('moveNextButton') moveNextButton: MoveNextButtonComponent;
    @ViewChild('mapviewButton') mapviewButton: MatButton;

    private _hotkeys: Hotkey[] = [];

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
    }

    onToggleMapView(): void {
        this._store$.dispatch(new PhotoStoreActions.ToggleMapViewRequestAction());
    }

    onMoveNext(): void {
        this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
    }

    onMovePrevious(): void {
        this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
    }

    private configureHotkeys(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event), [], 'Move Previous')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event), [], 'Move Next')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('z', (event: KeyboardEvent) => this.onHotkeyMapView(event), [], 'Enter Map View')
        ));
    }

    private onHotkeyMapView(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.mapviewButton);
        this.onToggleMapView();

        return false;
    }

    private onHotkeyMoveNext(evt: KeyboardEvent): boolean {
        this.triggerComponentRipple(this.moveNextButton);
        this.onMoveNext();

        return false;
    }

    private onHotkeyMovePrevious(evt: KeyboardEvent): boolean {
        this.triggerComponentRipple(this.movePreviousButton);
        this.onMovePrevious();

        return false;
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }

    private triggerComponentRipple(component: CanRipple) {
        if (component) {
            component.triggerRipple();
        }
    }
}
