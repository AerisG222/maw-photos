import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootStoreState } from 'src/app/core/root-store';
import { PhotoStoreActions } from 'src/app/core/root-store/photo-store';
import { LayoutStoreActions } from 'src/app/core/root-store/layout-store';

@Component({
    selector: 'app-photo-list-fullscreen-toolbar',
    templateUrl: './photo-list-fullscreen-toolbar.component.html',
    styleUrls: ['./photo-list-fullscreen-toolbar.component.scss']
})
export class PhotoListFullscreenToolbarComponent {
    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    onExitFullscreen(): void {
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this._store$.dispatch(new PhotoStoreActions.ExitFullscreenRequestAction());
    }
}
