import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { PhotoStoreSelectors, PhotoStoreActions, RootStoreState } from 'src/app/core/root-store';

@Component({
    selector: 'app-move-next-button',
    templateUrl: './move-next-button.component.html',
    styleUrls: ['./move-next-button.component.scss']
})
export class MoveNextButtonComponent implements OnInit, OnDestroy {
    private _hotkey: Hotkey;

    isLast$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this._hotkey = <Hotkey> this._hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event))
        );

        this.isLast$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );
    }

    ngOnDestroy() {
        this._hotkeysService.remove(this._hotkey);
    }

    onMoveNext(): void {
        this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
    }

    private onHotkeyMoveNext(event: KeyboardEvent): boolean {
        this.onMoveNext();

        return false;
    }
}
