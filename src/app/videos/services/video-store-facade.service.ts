import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Navigable } from 'src/app/models/store-facades/navigable';
import { helpMoveNext, helpMovePrevious } from 'src/app/models/store-facades/navigable-helpers';
import { VideoStoreActions, VideoStoreSelectors } from '../store';

@Injectable()
export class VideoStoreFacadeService implements Navigable {
    isFirst$ = this.store.select(VideoStoreSelectors.isActiveVideoFirst);
    isLast$ = this.store.select(VideoStoreSelectors.isActiveVideoLast);

    constructor(
        private store: Store
    ) {

    }

    moveNext(): void {
        helpMoveNext(this.isLast$, () => {
            this.store.dispatch(VideoStoreActions.moveNextRequest());
        });
    }

    movePrevious(): void {
        helpMovePrevious(this.isFirst$, () => {
            this.store.dispatch(VideoStoreActions.movePreviousRequest());
        });
    }
}
