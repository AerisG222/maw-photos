import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { RootStoreState } from 'src/app/core/root-store';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photo-store';

@Component({
    selector: 'app-move-previous-button',
    templateUrl: './move-previous-button.component.html',
    styleUrls: ['./move-previous-button.component.scss']
})
export class MovePreviousButtonComponent implements OnInit {
    isFirst$: Observable<boolean>;

    constructor(
        private _store$: Store<RootStoreState.State>
    ) { }

    ngOnInit() {
        this.isFirst$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );
    }

    onMovePrevious(): void {
        this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
    }
}
