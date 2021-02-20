import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
    GpsCoordinate,
    MapType,
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
} from '@models';
import { VideoStoreActions, VideoStoreSelectors } from '../store';
import {
    VideoCategoryStoreActions,
    VideoCategoryStoreSelectors,
} from '@core/root-store/video-category-store';
import { VideoInfoPanelSettingsFacade } from '@core/facades/settings/video-info-panel-settings-facade';

@Injectable()
export class VideoStoreFacadeService
    implements
        Navigable,
        Commentable,
        Ratable,
        MetadataEditable,
        MiniMapable,
        CategoryTeaserSelectable {
    activeVideo$ = this.store.select(VideoStoreSelectors.activeVideo);
    activeId$ = this.store.select(VideoStoreSelectors.activeVideoId);
    comments$ = this.store.select(VideoStoreSelectors.activeVideoComments);
    rating$ = this.store.select(VideoStoreSelectors.activeVideoRating);
    isFirst$ = this.store.select(VideoStoreSelectors.isActiveVideoFirst);
    isLast$ = this.store.select(VideoStoreSelectors.isActiveVideoLast);
    overrideGps$ = this.store.select(
        VideoStoreSelectors.activeVideoGpsDetailOverride
    );
    sourceGps$ = this.store.select(
        VideoStoreSelectors.activeVideoGpsDetailSource
    );
    mapType$ = this.videoInfoPanelFacade.settings$.pipe(
        map((x) => x.minimapMapType)
    );
    zoom$ = this.videoInfoPanelFacade.settings$.pipe(map((x) => x.minimapZoom));
    position$ = this.store.select(VideoStoreSelectors.activeVideoGoogleLatLng);
    currentTeaserUrl$ = this.store.select(
        VideoCategoryStoreSelectors.activeCategoryTeaserUrl
    );

    constructor(
        private store: Store,
        private videoInfoPanelFacade: VideoInfoPanelSettingsFacade
    ) {}

    addComment(comment: string): void {
        helpAddComment(this.activeId$, comment, (id, commentText) => {
            this.store.dispatch(
                VideoStoreActions.addCommentRequest({
                    videoId: id,
                    comment: commentText,
                })
            );
        });
    }

    rate(rating: number): void {
        helpRate(this.activeId$, rating, (id, userRating) => {
            this.store.dispatch(
                VideoStoreActions.rateVideoRequest({ videoId: id, userRating })
            );
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
            this.store.dispatch(
                VideoStoreActions.setGpsCoordinateOverrideRequest({
                    videoId: id,
                    latLng: gps,
                })
            );
        });
    }

    saveGpsOverrideAndMoveNext(latLng: GpsCoordinate): void {
        helpSaveGpsOverride(this.activeId$, latLng, (id, gps) => {
            this.store.dispatch(
                VideoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({
                    videoId: id,
                    latLng: gps,
                })
            );
        });
    }

    onMapTypeChange(mapType: MapType): void {
        this.videoInfoPanelFacade.saveMinimapType(mapType);
    }

    onZoomChange(zoom: number): void {
        this.videoInfoPanelFacade.saveMinimapZoom(zoom);
    }

    setCategoryTeaser(): void {
        helpSaveCategoryTeaser(this.activeVideo$, (categoryId, videoId) => {
            this.store.dispatch(
                VideoCategoryStoreActions.setTeaserRequest({
                    categoryId,
                    videoId,
                })
            );
        });
    }
}
