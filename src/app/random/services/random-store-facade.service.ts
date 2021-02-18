import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line max-len
import {
    SettingsStoreActions,
    PhotoStoreActions,
    PhotoStoreSelectors,
    PhotoCategoryStoreActions,
    PhotoCategoryStoreSelectors,
    RouterStoreSelectors,
} from '@core/root-store';
import {
    Photo,
    GpsCoordinate,
    MapType,
    RouteHelper,
    PhotoViewMode,
} from '@models';
import {
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
    PhotoLinkable,
} from '@core/facades';
import { PhotoViewModeSelectable } from '@core/facades/photo-view-mode-selectable';
import { RandomInfoPanelSettingsFacade } from '@core/facades/settings/random-info-panel-settings-facade';
import { RandomPageSettingsFacade } from '@core/facades/settings/random-page-settings-facade';

@Injectable()
export class RandomStoreFacadeService
    implements
        OnDestroy,
        Navigable,
        Commentable,
        Ratable,
        MetadataEditable,
        MiniMapable,
        CategoryTeaserSelectable,
        PhotoLinkable,
        PhotoViewModeSelectable {
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    activeId$ = this.store.select(PhotoStoreSelectors.activePhotoId);
    comments$ = this.store.select(PhotoStoreSelectors.activePhotoComments);
    rating$ = this.store.select(PhotoStoreSelectors.activePhotoRating);
    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);
    overrideGps$ = this.store.select(
        PhotoStoreSelectors.activePhotoGpsDetailOverride
    );
    sourceGps$ = this.store.select(
        PhotoStoreSelectors.activePhotoGpsDetailSource
    );
    position$ = this.store.select(PhotoStoreSelectors.activePhotoGoogleLatLng);
    mapType$ = this.infoPanelFacade.settings$.pipe(
        map((x) => x.minimapMapType)
    );
    zoom$ = this.infoPanelFacade.settings$.pipe(map((x) => x.minimapZoom));
    currentTeaserUrl$ = this.store.select(
        PhotoCategoryStoreSelectors.activeCategoryTeaserUrl
    );
    activePhotoViewMode$ = this.store.select(RouterStoreSelectors.photoView);
    preferredPhotoViewMode$ = this.randomPageFacade.settings$.pipe(
        map((x) => x.viewMode)
    );

    private destroySub = new Subscription();
    private view = 'grid';

    constructor(
        private store: Store,
        private infoPanelFacade: RandomInfoPanelSettingsFacade,
        private randomPageFacade: RandomPageSettingsFacade
    ) {
        // TODO: we do this so that we can keep the url builder method below, perhaps there is a better way...
        this.destroySub.add(
            this.store.select(RouterStoreSelectors.photoView).subscribe({
                next: (view) => (this.view = view),
            })
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
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

    setCategoryTeaser() {
        helpSaveCategoryTeaser(this.activePhoto$, (categoryId, photoId) => {
            this.store.dispatch(
                PhotoCategoryStoreActions.setTeaserRequest({
                    categoryId,
                    photoId,
                })
            );
        });
    }

    buildPhotoLink(photo: Photo) {
        return RouteHelper.randomAbs(this.view, photo.id);
    }

    selectPhotoViewMode(mode: PhotoViewMode) {
        this.randomPageFacade.saveViewMode(mode);
    }
}
