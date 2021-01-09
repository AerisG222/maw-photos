import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GpsCoordinate } from '@models';
import {
    Commentable,
    helpAddComment,
    MetadataEditable,
    helpSaveGpsOverride,
    Navigable,
    helpMoveNext,
    helpMovePrevious,
    Ratable,
    helpRate,
    MiniMapable,
    CategoryTeaserSelectable,
    helpSaveCategoryTeaser,
} from '@core/facades';
import { VideoStoreActions, VideoStoreSelectors } from '../store';
import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store/settings-store';
import { VideoCategoryStoreActions, VideoCategoryStoreSelectors } from '@core/root-store/video-category-store';

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
