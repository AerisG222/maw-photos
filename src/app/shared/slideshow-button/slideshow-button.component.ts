import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { PhotoStoreSelectors, PhotoStoreActions, RootStoreState } from 'src/app/core/root-store';

@Component({
    selector: 'app-slideshow-button',
    templateUrl: './slideshow-button.component.html',
    styleUrls: ['./slideshow-button.component.scss']
})
export class SlideshowButtonComponent implements OnInit, OnDestroy {
    private _hotkeys: Hotkey[] = [];

    slideshowPlaying$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('p', (event: KeyboardEvent) => this.onHotkeyToggleSlideshow(event))
        ));

        this.slideshowPlaying$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectSlideshowIsPlaying)
            );
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
    }

    onToggleSlideshow(): void {
        this._store$.dispatch(new PhotoStoreActions.ToggleSlideshowRequestAction());
    }

    private onHotkeyToggleSlideshow(evt: KeyboardEvent): boolean {
        this.onToggleSlideshow();

        return false;
    }
}
