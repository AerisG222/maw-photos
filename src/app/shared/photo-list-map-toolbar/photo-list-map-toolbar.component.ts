import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { RootStoreState, PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store';
import { MovePreviousButtonComponent } from '../move-previous-button/move-previous-button.component';
import { MoveNextButtonComponent } from '../move-next-button/move-next-button.component';
import { CanRipple } from 'src/app/core/models/can-ripple.model';

@Component({
    selector: 'app-photo-list-map-toolbar',
    templateUrl: './photo-list-map-toolbar.component.html',
    styleUrls: ['./photo-list-map-toolbar.component.scss']
})
export class PhotoListMapToolbarComponent implements OnInit, OnDestroy {
    @ViewChild('movePreviousButton', {static: false}) movePreviousButton: MovePreviousButtonComponent;
    @ViewChild('moveNextButton', {static: false}) moveNextButton: MoveNextButtonComponent;
    @ViewChild('mapviewButton', {static: false}) mapviewButton: MatButton;

    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;

    private hotkeys: Hotkey[] = [];

    constructor(
        private store$: Store<RootStoreState.State>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        this.isFirst$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirstWithGpsCoordinates)
            );

        this.isLast$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLastWithGpsCoordinates)
            );
    }

    ngOnDestroy(): void {
        this.hotkeysService.remove(this.hotkeys);
    }

    onToggleMapView(): void {
        this.store$.dispatch(PhotoStoreActions.toggleMapViewRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(PhotoStoreActions.moveNextWithGpsRequest());
    }

    onMovePrevious(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousWithGpsRequest());
    }

    private configureHotkeys(): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event), [], 'Move Previous')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event), [], 'Move Next')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('z', (event: KeyboardEvent) => this.onHotkeyMapView(event), [], 'Enter Map View')
        ) as Hotkey);
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
