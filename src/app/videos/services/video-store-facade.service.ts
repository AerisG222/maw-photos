import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Commentable } from 'src/app/models/store-facades/commentable';

import { helpAddComment } from 'src/app/models/store-facades/commentable-helper';
import { Navigable } from 'src/app/models/store-facades/navigable';
import { helpMoveNext, helpMovePrevious } from 'src/app/models/store-facades/navigable-helpers';
import { Ratable } from 'src/app/models/store-facades/ratable';
import { helpRate } from 'src/app/models/store-facades/ratable-helper';
import { VideoStoreActions, VideoStoreSelectors } from '../store';

@Injectable()
export class VideoStoreFacadeService implements Navigable, Commentable, Ratable {
    activeId$ = this.store.select(VideoStoreSelectors.activeVideoId);
    comments$ = this.store.select(VideoStoreSelectors.activeVideoComments);
    rating$ = this.store.select(VideoStoreSelectors.activeVideoRating);
    isFirst$ = this.store.select(VideoStoreSelectors.isActiveVideoFirst);
    isLast$ = this.store.select(VideoStoreSelectors.isActiveVideoLast);

    constructor(
        private store: Store
    ) {

    }

    addComment(comment: string): void {
        helpAddComment(this.activeId$, comment, (id, commentText) =>  {
            this.store.dispatch(VideoStoreActions.addCommentRequest({ videoId: id as number, comment: commentText }));
        });
    }

    rate(rating: number): void {
        helpRate(this.activeId$, rating, (id, userRating) => {
            this.store.dispatch(VideoStoreActions.rateVideoRequest({ videoId: id as number, userRating }));
        });
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
