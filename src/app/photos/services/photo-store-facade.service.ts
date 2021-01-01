import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';
import { Commentable } from 'src/app/models/store-facades/commentable';
import { helpAddComment } from 'src/app/models/store-facades/commentable-helper';
import { Navigable } from 'src/app/models/store-facades/navigable';
import { helpMoveNext, helpMovePrevious } from 'src/app/models/store-facades/navigable-helpers';
import { Ratable } from 'src/app/models/store-facades/ratable';
import { helpRate } from 'src/app/models/store-facades/ratable-helper';

@Injectable()
export class PhotoStoreFacadeService implements Navigable, Commentable, Ratable {
    activeId$ = this.store.select(PhotoStoreSelectors.activePhotoId);
    comments$ = this.store.select(PhotoStoreSelectors.activePhotoComments);
    rating$ = this.store.select(PhotoStoreSelectors.activePhotoRating);
    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);

    constructor(
        private store: Store
    ) {

    }

    addComment(comment: string): void {
        helpAddComment(this.activeId$, comment, (id, commentText) => {
            this.store.dispatch(PhotoStoreActions.addCommentRequest({ photoId: id as number, comment: commentText }));
        });
    }

    rate(rating: number): void {
        helpRate(this.activeId$, rating, (id, userRating) => {
            this.store.dispatch(PhotoStoreActions.ratePhotoRequest({ photoId: id as number, userRating }));
        });
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
