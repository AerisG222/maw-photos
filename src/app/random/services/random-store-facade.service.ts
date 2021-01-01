import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';
import { Navigable } from 'src/app/models/store-facades/navigable';
import { helpMoveNext, helpMovePrevious } from 'src/app/models/store-facades/navigable-helpers';

@Injectable()
export class RandomStoreFacadeService implements Navigable {
    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);

    constructor(
        private store: Store
    ) {

    }

    moveNext(): void {
        helpMoveNext(this.isLast$, () => {
            this.store.dispatch(PhotoStoreActions.moveNextRequest());
        });
    }

    movePrevious(): void {
        helpMovePrevious(this.isFirst$, () => {
            this.store.dispatch(PhotoStoreActions.movePreviousRequest());
        });
    }
}
