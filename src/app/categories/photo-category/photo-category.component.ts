import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, flatMap, tap, takeUntil, filter } from 'rxjs/operators';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { Settings } from 'src/app/core/models/settings.model';
import { SlideshowControlService } from 'src/app/core/services/slideshow-control.service';
import {
    LayoutStoreActions,
    RootStoreState,
    PhotoCategoryStoreActions,
    PhotoCategoryStoreSelectors,
    PhotoStoreSelectors, PhotoStoreActions,
    SettingsStoreSelectors,
    SettingsStoreActions
} from 'src/app/core/root-store';
import { MapImage } from 'src/app/core/models/map-image.model';

@Component({
    selector: 'app-photo-category',
    templateUrl: './photo-category.component.html',
    styleUrls: ['./photo-category.component.scss']
})
export class PhotoCategoryComponent implements OnInit, OnDestroy {
    destroy$ = new Subject<boolean>();
    settings$: Observable<Settings>;
    category$: Observable<PhotoCategory>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;
    isFullscreen$: Observable<boolean>;
    isMapView$: Observable<boolean>;
    mapImages$: Observable<MapImage[]>;

    constructor(
        private _route: ActivatedRoute,
        private slideshowControlSvc: SlideshowControlService,
        private _store$: Store<RootStoreState.State>
    ) {

    }

    ngOnInit() {
        this.settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.category$ = this._store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory)
            );

        this.photos$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos),
                tap(photos => this.setCurrentPhoto(photos[0]))
            );

        this.mapImages$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectPhotosWithGpsCoordinates),
                map(photos => photos.map(x => ({
                    id: x.id,
                    imageUrl: x.imageXsSq.url,
                    latitude: x.latitude,
                    longitude: x.longitude
                })))
            );

        this.isFullscreen$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsFullscreenView)
            );

        this.isMapView$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsMapView)
            );

        this.activePhoto$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x)
            );

        this.effects$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects),
                filter(x => !!x)
            );

        this._store$.dispatch(new PhotoStoreActions.ClearRequestAction());
        this._store$.dispatch(new SettingsStoreActions.LoadRequestAction());
        this._store$.dispatch(new LayoutStoreActions.OpenRightSidebarRequestAction());

        this._route.params
            .pipe(
                map(p => Number(p.id)),
                tap(id => this._store$.dispatch(new PhotoCategoryStoreActions.SetCurrentByIdAction({ categoryId: id }))),
                tap(id => this._store$.dispatch(new PhotoStoreActions.LoadRequestAction({ categoryId: id }))),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    ngOnDestroy(): void {
        this._store$.dispatch(new LayoutStoreActions.ExitFullscreenRequestAction());
        this._store$.dispatch(new LayoutStoreActions.CloseRightSidebarRequestAction());
        this.destroy$.next(true);
        this.setCurrentPhoto(null);
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this._store$.dispatch(new PhotoStoreActions.SetCurrentAction({ photo: photo }));
    }
}
