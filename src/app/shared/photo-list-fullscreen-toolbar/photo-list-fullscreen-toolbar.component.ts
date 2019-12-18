import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import {
    LayoutStoreActions,
    PhotoStoreActions,
    PhotoStoreSelectors
} from 'src/app/core/root-store';
import { MatButton } from '@angular/material/button';
import { CanRipple } from 'src/app/core/models/can-ripple.model';
import { MovePreviousButtonComponent } from '../move-previous-button/move-previous-button.component';
import { MoveNextButtonComponent } from '../move-next-button/move-next-button.component';
import { SlideshowButtonComponent } from '../slideshow-button/slideshow-button.component';

@Component({
    selector: 'app-photo-list-fullscreen-toolbar',
    templateUrl: './photo-list-fullscreen-toolbar.component.html',
    styleUrls: ['./photo-list-fullscreen-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListFullscreenToolbarComponent implements OnInit, OnDestroy {
    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;

    @ViewChild('exitFullscreenButton') exitFullscreenButton: MatButton;
    @ViewChild('movePreviousButton') movePreviousButton: MovePreviousButtonComponent;
    @ViewChild('moveNextButton') moveNextButton: MoveNextButtonComponent;
    @ViewChild('toggleSlideshowButton') toggleSlideshowButton: SlideshowButtonComponent;

    private hotkeys: Hotkey[] = [];

    constructor(
        private store$: Store<{}>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit(): void {
        this.isFirst$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event), [], 'Move Next')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event), [], 'Move Previous')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('p', (event: KeyboardEvent) => this.onHotkeyToggleSlideshow(event), [], 'Play / Pause Slideshow')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('f', (evt: KeyboardEvent) => this.onHotkeyExitFullscreen(evt), [], 'Exit Fullscreen')
        ) as Hotkey);
    }

    ngOnDestroy(): void {
        this.hotkeysService.remove(this.hotkeys);
    }

    onExitFullscreen(): void {
        this.store$.dispatch(LayoutStoreActions.exitFullscreenRequest());
        this.store$.dispatch(PhotoStoreActions.exitFullscreenRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onMovePrevious(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onToggleSlideshow(): void {
        this.store$.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }

    private onHotkeyExitFullscreen(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.exitFullscreenButton);
        this.onExitFullscreen();

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

    private onHotkeyToggleSlideshow(evt: KeyboardEvent): boolean {
        this.triggerComponentRipple(this.toggleSlideshowButton);
        this.onToggleSlideshow();

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
