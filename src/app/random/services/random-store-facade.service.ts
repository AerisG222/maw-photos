import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import {
    PhotoStoreActions,
    PhotoStoreSelectors,
    PhotoCategoryStoreActions,
    PhotoCategoryStoreSelectors,
    RouterStoreSelectors,
} from '@core/root-store';
import {
    GpsCoordinate,
    MapType,
    Commentable,
    helpAddComment,
    MetadataEditable,
    helpSaveGpsOverride,
    MiniMapable,
    Navigable,
    helpMoveNext,
    helpMovePrevious,
    Ratable,
    helpRate,
    CategoryTeaserSelectable,
    helpSaveCategoryTeaser,
    PhotoViewModeSelectable,
} from '@models';
import { RandomInfoPanelSettingsFacade } from '@core/facades/settings/random-info-panel-settings-facade';
import { RandomPageSettingsFacade } from '@core/facades/settings/random-page-settings-facade';

@Injectable()
export class RandomStoreFacadeService
    implements
        Navigable,
        Commentable,
        Ratable,
        MetadataEditable,
        MiniMapable,
        CategoryTeaserSelectable,
        PhotoViewModeSelectable {
    activePhoto$ = this.store.select(PhotoStoreSelectors.selectActivePhoto);
    activeId$ = this.store.select(PhotoStoreSelectors.selectActivePhotoId);
    comments$ = this.store.select(PhotoStoreSelectors.selectActivePhotoComments);
    rating$ = this.store.select(PhotoStoreSelectors.selectActivePhotoRating);
    isFirst$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.selectIsActivePhotoLast);
    overrideGps$ = this.store.select(
        PhotoStoreSelectors.selectActivePhotoGpsDetailOverride
    );
    sourceGps$ = this.store.select(
        PhotoStoreSelectors.selectActivePhotoGpsDetailSource
    );
    position$ = this.store.select(PhotoStoreSelectors.selectActivePhotoGoogleLatLng);
    mapType$ = this.infoPanelFacade.settings$.pipe(
        map((x) => x.minimapMapType)
    );
    zoom$ = this.infoPanelFacade.settings$.pipe(map((x) => x.minimapZoom));
    currentTeaserUrl$ = this.store.select(
        PhotoCategoryStoreSelectors.selectActiveCategoryTeaserUrl
    );
    activePhotoViewMode$ = this.store.select(
        RouterStoreSelectors.selectCurrentViewMode
    );
    preferredPhotoViewMode$ = this.randomPageFacade.settings$.pipe(
        map((x) => x.viewMode)
    );

    constructor(
        private store: Store,
        private infoPanelFacade: RandomInfoPanelSettingsFacade,
        private randomPageFacade: RandomPageSettingsFacade
    ) {

    }

    addComment(comment: string): void {
        helpAddComment(this.activeId$, comment, (id, commentText) => {
            this.store.dispatch(
                PhotoStoreActions.addCommentRequest({
                    photoId: id,
                    comment: commentText,
                })
            );
        });
    }

    rate(rating: number): void {
        helpRate(this.activeId$, rating, (id, userRating) => {
            this.store.dispatch(
                PhotoStoreActions.ratePhotoRequest({ photoId: id, userRating })
            );
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

    saveGpsOverride(latLng: GpsCoordinate): void {
        helpSaveGpsOverride(this.activeId$, latLng, (id, gps) => {
            this.store.dispatch(
                PhotoStoreActions.setGpsCoordinateOverrideRequest({
                    photoId: id,
                    latLng: gps,
                })
            );
        });
    }

    saveGpsOverrideAndMoveNext(latLng: GpsCoordinate): void {
        helpSaveGpsOverride(this.activeId$, latLng, (id, gps) => {
            this.store.dispatch(
                PhotoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({
                    photoId: id,
                    latLng: gps,
                })
            );
        });
    }

    onMapTypeChange(mapType: MapType): void {
        this.infoPanelFacade.saveMinimapType(mapType);
    }

    onZoomChange(zoom: number): void {
        this.infoPanelFacade.saveMinimapZoom(zoom);
    }

    setCategoryTeaser(): void {
        helpSaveCategoryTeaser(this.activePhoto$, (categoryId, photoId) => {
            this.store.dispatch(
                PhotoCategoryStoreActions.setTeaserRequest({
                    categoryId,
                    photoId,
                })
            );
        });
    }
}
