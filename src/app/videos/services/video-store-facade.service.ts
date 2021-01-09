import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GpsCoordinate } from '@models/gps-coordinate.model';
import { Commentable } from '@models/store-facades/commentable';
import { helpAddComment } from '@models/store-facades/commentable-helper';
import { MetadataEditable } from '@models/store-facades/metadata-editable';
import { helpSaveGpsOverride } from '@models/store-facades/metadata-editable-helper';
import { Navigable } from '@models/store-facades/navigable';
import { helpMoveNext, helpMovePrevious } from '@models/store-facades/navigable-helpers';
import { Ratable } from '@models/store-facades/ratable';
import { helpRate } from '@models/store-facades/ratable-helper';
import { VideoStoreActions, VideoStoreSelectors } from '../store';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store/settings-store';
import { MiniMapable } from '@models/store-facades/mini-mapable';
import { CategoryTeaserSelectable } from '@models/store-facades/category-teaser-selectable';
import { VideoCategoryStoreActions, VideoCategoryStoreSelectors } from '@core/root-store/video-category-store';
import { helpSaveCategoryTeaser } from '@models/store-facades/category-teaser-selectable-helper';

@Injectable()
export class VideoStoreFacadeService implements Navigable, Commentable, Ratable, MetadataEditable, MiniMapable, CategoryTeaserSelectable {
    activeVideo$ = this.store.select(VideoStoreSelectors.activeVideo);
    activeId$ = this.store.select(VideoStoreSelectors.activeVideoId);
    comments$ = this.store.select(VideoStoreSelectors.activeVideoComments);
    rating$ = this.store.select(VideoStoreSelectors.activeVideoRating);
    isFirst$ = this.store.select(VideoStoreSelectors.isActiveVideoFirst);
    isLast$ = this.store.select(VideoStoreSelectors.isActiveVideoLast);
    overrideGps$ = this.store.select(VideoStoreSelectors.activeVideoGpsDetailOverride);
    sourceGps$ = this.store.select(VideoStoreSelectors.activeVideoGpsDetailSource);
    mapTypeId$ = this.store.select(SettingsStoreSelectors.videoInfoPanelMinimapMapTypeId);
    zoom$ = this.store.select(SettingsStoreSelectors.videoInfoPanelMinimapZoom);
    position$ = this.store.select(VideoStoreSelectors.activeVideoGoogleLatLng);
    mapTheme$ = this.store.select(SettingsStoreSelectors.mapTheme);
    currentTeaserUrl$ = this.store.select(VideoCategoryStoreSelectors.activeCategoryTeaserUrl);

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

    onMapTypeChange(mapTypeId: string): void {
        this.store.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updateVideoInfoPanelMinimapZoomRequest({ zoom }));
    }

    setCategoryTeaser() {
        helpSaveCategoryTeaser(this.activeVideo$, (categoryId, videoId) => {
            this.store.dispatch(VideoCategoryStoreActions.setTeaserRequest({
                categoryId,
                videoId
            }));
        });
    }
}
