import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// eslint-disable-next-line max-len
import { SettingsStoreActions, SettingsStoreSelectors, PhotoStoreActions, PhotoStoreSelectors, PhotoCategoryStoreActions, PhotoCategoryStoreSelectors, RouterStoreSelectors } from '@core/root-store';
import { Photo, GpsCoordinate, MapType } from '@models';
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
import { RouteHelperService } from '@core/services';
import { Subscription } from 'rxjs';

@Injectable()
export class RandomStoreFacadeService implements
    OnDestroy,
    Navigable,
    Commentable,
    Ratable,
    MetadataEditable,
    MiniMapable,
    CategoryTeaserSelectable,
    PhotoLinkable
{
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    activeId$ = this.store.select(PhotoStoreSelectors.activePhotoId);
    comments$ = this.store.select(PhotoStoreSelectors.activePhotoComments);
    rating$ = this.store.select(PhotoStoreSelectors.activePhotoRating);
    isFirst$ = this.store.select(PhotoStoreSelectors.isActivePhotoFirst);
    isLast$ = this.store.select(PhotoStoreSelectors.isActivePhotoLast);
    overrideGps$ = this.store.select(PhotoStoreSelectors.activePhotoGpsDetailOverride);
    sourceGps$ = this.store.select(PhotoStoreSelectors.activePhotoGpsDetailSource);
    mapType$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapMapType);
    position$ = this.store.select(PhotoStoreSelectors.activePhotoGoogleLatLng);
    zoom$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapZoom);
    mapTheme$ = this.store.select(SettingsStoreSelectors.mapTheme);
    currentTeaserUrl$ = this.store.select(PhotoCategoryStoreSelectors.activeCategoryTeaserUrl);

    private destroySub = new Subscription();
    private view = 'grid';

    constructor(
        private store: Store,
        private routeHelper: RouteHelperService
    ) {
        // TODO: we do this so that we can keep the url builder method below, perhaps there is a better way...
        this.destroySub.add(this.store.select(RouterStoreSelectors.photoView)
            .subscribe({
                next: view => this.view = view
            }));
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    addComment(comment: string): void {
        helpAddComment(this.activeId$, comment, (id, commentText) =>  {
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

    saveGpsOverride(latLng: GpsCoordinate): void {
        helpSaveGpsOverride(this.activeId$, latLng, (id, gps) => {
            this.store.dispatch(PhotoStoreActions.setGpsCoordinateOverrideRequest({ photoId: id, latLng: gps }));
        });
    }

    saveGpsOverrideAndMoveNext(latLng: GpsCoordinate): void {
        helpSaveGpsOverride(this.activeId$, latLng, (id, gps) => {
            this.store.dispatch(PhotoStoreActions.setGpsCoordinateOverrideAndMoveNextRequest({ photoId: id, latLng: gps }));
        });
    }

    onMapTypeChange(mapType: MapType): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeRequest({ mapType }));
    }

    onZoomChange(zoom: number): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapZoomRequest({ zoom }));
    }

    setCategoryTeaser() {
        helpSaveCategoryTeaser(this.activePhoto$, (categoryId, photoId) => {
            this.store.dispatch(PhotoCategoryStoreActions.setTeaserRequest({
                categoryId,
                photoId
            }));
        });
    }

    buildPhotoLink(photo: Photo) {
        return this.routeHelper.randomAbs(this.view, photo.id);
    }
}
