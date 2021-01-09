import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { SettingsStoreActions, SettingsStoreSelectors } from '@core/root-store/settings-store';
import { PhotoStoreActions, PhotoStoreSelectors } from '@core/root-store/photos-store';
import { GpsCoordinate } from '@models/gps-coordinate.model';
import { Commentable } from '@models/store-facades/commentable';
import { helpAddComment } from '@models/store-facades/commentable-helper';
import { MetadataEditable } from '@models/store-facades/metadata-editable';
import { helpSaveGpsOverride } from '@models/store-facades/metadata-editable-helper';
import { MiniMapable } from '@models/store-facades/mini-mapable';
import { Navigable } from '@models/store-facades/navigable';
import { helpMoveNext, helpMovePrevious } from '@models/store-facades/navigable-helpers';
import { Ratable } from '@models/store-facades/ratable';
import { helpRate } from '@models/store-facades/ratable-helper';
import { CategoryTeaserSelectable } from '@models/store-facades/category-teaser-selectable';
import { PhotoCategoryStoreActions, PhotoCategoryStoreSelectors } from '@core/root-store/photo-category-store';
import { helpSaveCategoryTeaser } from '@models/store-facades/category-teaser-selectable-helper';
import { PhotoLinkable } from '@models/store-facades/photo-linkable';
import { RouteHelperService } from '@core/services/route-helper.service';
import { Photo } from '@models/photo.model';
import { RouterStoreSelectors } from '@core/root-store';

@Injectable()
export class PhotoStoreFacadeService implements
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
    mapTypeId$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapMapTypeId);
    position$ = this.store.select(PhotoStoreSelectors.activePhotoGoogleLatLng);
    zoom$ = this.store.select(SettingsStoreSelectors.photoInfoPanelMinimapZoom);
    mapTheme$ = this.store.select(SettingsStoreSelectors.mapTheme);
    currentTeaserUrl$ = this.store.select(PhotoCategoryStoreSelectors.activeCategoryTeaserUrl);
    view$ = this.store.select(RouterStoreSelectors.photoView);

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

    onMapTypeChange(mapTypeId: string): void {
        this.store.dispatch(SettingsStoreActions.updatePhotoInfoPanelMinimapMapTypeIdRequest({ mapTypeId }));
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
        return this.routeHelper.photoCategoriesAbs(this.view, photo.categoryId, photo.id);
    }
}
