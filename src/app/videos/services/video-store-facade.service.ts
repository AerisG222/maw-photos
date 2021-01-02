import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GpsCoordinate } from 'src/app/models/gps-coordinate.model';
import { Commentable } from 'src/app/models/store-facades/commentable';

import { helpAddComment } from 'src/app/models/store-facades/commentable-helper';
import { MetadataEditable } from 'src/app/models/store-facades/metadata-editable';
import { helpSaveGpsOverride } from 'src/app/models/store-facades/metadata-editable-helper';
import { Navigable } from 'src/app/models/store-facades/navigable';
import { helpMoveNext, helpMovePrevious } from 'src/app/models/store-facades/navigable-helpers';
import { Ratable } from 'src/app/models/store-facades/ratable';
import { helpRate } from 'src/app/models/store-facades/ratable-helper';
import { VideoStoreActions, VideoStoreSelectors } from '../store';

@Injectable()
export class VideoStoreFacadeService implements Navigable, Commentable, Ratable, MetadataEditable {
    activeId$ = this.store.select(VideoStoreSelectors.activeVideoId);
    comments$ = this.store.select(VideoStoreSelectors.activeVideoComments);
    rating$ = this.store.select(VideoStoreSelectors.activeVideoRating);
    isFirst$ = this.store.select(VideoStoreSelectors.isActiveVideoFirst);
    isLast$ = this.store.select(VideoStoreSelectors.isActiveVideoLast);
    overrideGps$ = this.store.select(VideoStoreSelectors.activeVideoGpsDetailOverride);
    sourceGps$ = this.store.select(VideoStoreSelectors.activeVideoGpsDetailSource);

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

    saveGpsOverride(latLng: GpsCoordinate): void {
        helpSaveGpsOverride(this.activeId$, latLng, (id, gps) => {
            this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideRequest({ videoId: id, latLng: gps }));
        });
    }

    saveGpsOverrideAndMoveNext(latLng: GpsCoordinate): void {
        helpSaveGpsOverride(this.activeId$, latLng, (id, gps) => {
            this.store.dispatch(VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ videoId: id, latLng: gps }));
        });
    }
}
