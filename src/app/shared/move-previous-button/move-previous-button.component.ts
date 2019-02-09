import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

import { PhotoStoreActions, PhotoStoreSelectors, RootStoreState } from 'src/app/core/root-store';

@Component({
    selector: 'app-move-previous-button',
    templateUrl: './move-previous-button.component.html',
    styleUrls: ['./move-previous-button.component.scss']
})
export class MovePreviousButtonComponent implements OnInit, OnDestroy {
    private _hotkey: Hotkey;

    isFirst$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this._hotkey = <Hotkey> this._hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event))
        );

        this.isFirst$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );
    }

    ngOnDestroy() {
        this._hotkeysService.remove(this._hotkey);
    }

    onMovePrevious(): void {
        this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
    }

    private onHotkeyMovePrevious(event: KeyboardEvent): boolean {
        this.onMovePrevious();

        return false;
    }
}
