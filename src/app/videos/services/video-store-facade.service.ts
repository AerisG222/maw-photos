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
    activeVideo$ = this.store.select(VideoStoreSelectors.selectActiveVideo);
    activeId$ = this.store.select(VideoStoreSelectors.selectActiveVideoId);
    comments$ = this.store.select(VideoStoreSelectors.selectActiveVideoComments);
    rating$ = this.store.select(VideoStoreSelectors.selectActiveVideoRating);
    isFirst$ = this.store.select(VideoStoreSelectors.selectIsActiveVideoFirst);
    isLast$ = this.store.select(VideoStoreSelectors.selectIsActiveVideoLast);
    overrideGps$ = this.store.select(
        VideoStoreSelectors.selectActiveVideoGpsDetailOverride
    );
    sourceGps$ = this.store.select(
        VideoStoreSelectors.selectActiveVideoGpsDetailSource
    );
    mapType$ = this.videoInfoPanelFacade.settings$.pipe(
        map((x) => x.minimapMapType)
    );
    zoom$ = this.videoInfoPanelFacade.settings$.pipe(map((x) => x.minimapZoom));
    position$ = this.store.select(VideoStoreSelectors.selectActiveVideoGoogleLatLng);
    currentTeaserUrl$ = this.store.select(
        VideoCategoryStoreSelectors.selectActiveCategoryTeaserUrl
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
